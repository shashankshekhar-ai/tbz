"""Initial schema — leads, assessments, forms, resources, audit

Revision ID: 001
Revises:
Create Date: 2026-07-09
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("first_name", sa.String(100), nullable=True),
        sa.Column("last_name", sa.String(100), nullable=True),
        sa.Column("company", sa.String(255), nullable=True),
        sa.Column("job_title", sa.String(255), nullable=True),
        sa.Column("phone", sa.String(50), nullable=True),
        sa.Column("source", sa.String(100), nullable=True),
        sa.Column("utm_source", sa.String(100), nullable=True),
        sa.Column("utm_medium", sa.String(100), nullable=True),
        sa.Column("utm_campaign", sa.String(100), nullable=True),
        sa.Column("referrer", sa.Text(), nullable=True),
        sa.Column("hubspot_contact_id", sa.String(100), nullable=True),
        sa.Column("clickup_task_id", sa.String(100), nullable=True),
        sa.Column("clerk_user_id", sa.String(100), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("clerk_user_id"),
    )
    op.create_index("ix_leads_email", "leads", ["email"])
    op.create_index("ix_leads_hubspot_contact_id", "leads", ["hubspot_contact_id"])
    op.create_index("ix_leads_clerk_user_id", "leads", ["clerk_user_id"])

    op.create_table(
        "lead_events",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lead_id", sa.Integer(), nullable=False),
        sa.Column("event_type", sa.String(100), nullable=False),
        sa.Column("metadata_json", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["lead_id"], ["leads.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_lead_events_lead_id", "lead_events", ["lead_id"])

    op.create_table(
        "form_submissions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lead_id", sa.Integer(), nullable=True),
        sa.Column("form_type", sa.String(100), nullable=False),
        sa.Column("data_json", sa.Text(), nullable=False),
        sa.Column("hubspot_synced", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("clickup_synced", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("email_sent", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("n8n_triggered", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["lead_id"], ["leads.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_form_submissions_lead_id", "form_submissions", ["lead_id"])

    op.create_table(
        "resource_downloads",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lead_id", sa.Integer(), nullable=True),
        sa.Column("resource_slug", sa.String(255), nullable=False),
        sa.Column("resource_title", sa.String(500), nullable=True),
        sa.Column("access_token", sa.String(255), nullable=True),
        sa.Column("ip_address", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["lead_id"], ["leads.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("access_token"),
    )
    op.create_index("ix_resource_downloads_lead_id", "resource_downloads", ["lead_id"])
    op.create_index("ix_resource_downloads_resource_slug", "resource_downloads", ["resource_slug"])
    op.create_index("ix_resource_downloads_access_token", "resource_downloads", ["access_token"])

    op.create_table(
        "assessment_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("lead_id", sa.Integer(), nullable=True),
        sa.Column("session_token", sa.String(255), nullable=False),
        sa.Column("status", sa.String(50), nullable=False, server_default="in_progress"),
        sa.Column("completed_at", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["lead_id"], ["leads.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_token"),
    )
    op.create_index("ix_assessment_sessions_lead_id", "assessment_sessions", ["lead_id"])
    op.create_index("ix_assessment_sessions_session_token", "assessment_sessions", ["session_token"])

    op.create_table(
        "assessment_answers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("question_id", sa.String(100), nullable=False),
        sa.Column("answer_value", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["session_id"], ["assessment_sessions.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_assessment_answers_session_id", "assessment_answers", ["session_id"])

    op.create_table(
        "assessment_results",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("session_id", sa.Integer(), nullable=False),
        sa.Column("overall_score", sa.Integer(), nullable=False),
        sa.Column("maturity_level", sa.String(50), nullable=False),
        sa.Column("summary", sa.Text(), nullable=True),
        sa.Column("recommendations_json", sa.Text(), nullable=True),
        sa.Column("ai_output_json", sa.Text(), nullable=True),
        sa.Column("report_file_path", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["session_id"], ["assessment_sessions.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id"),
    )

    op.create_table(
        "audit_logs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("actor_id", sa.String(255), nullable=True),
        sa.Column("action", sa.String(255), nullable=False),
        sa.Column("resource_type", sa.String(100), nullable=True),
        sa.Column("resource_id", sa.String(255), nullable=True),
        sa.Column("metadata_json", sa.Text(), nullable=True),
        sa.Column("ip_address", sa.String(50), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("audit_logs")
    op.drop_table("assessment_results")
    op.drop_table("assessment_answers")
    op.drop_table("assessment_sessions")
    op.drop_table("resource_downloads")
    op.drop_table("form_submissions")
    op.drop_table("lead_events")
    op.drop_table("leads")
