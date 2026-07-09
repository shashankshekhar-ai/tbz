# 07 — Data Model

## Core entities

## users

Represents authenticated portal users.

Fields:

- id
- clerk_user_id
- email
- name
- created_at
- updated_at

## leads

Represents any person or organization entering through a form, resource, assessment, or Columbus.

Fields:

- id
- email
- name
- company
- role
- phone
- source
- source_page
- intent_type
- segment
- urgency
- interest_area
- raw_input
- structured_payload
- hubspot_contact_id
- clickup_task_id
- status
- created_at
- updated_at

## lead_events

Tracks timeline of every lead action.

Fields:

- id
- lead_id
- event_type
- source
- payload
- created_at

Event examples:

- contact_form_submitted
- resource_requested
- assessment_started
- assessment_completed
- columbus_conversation_received
- hubspot_contact_created
- clickup_task_created
- email_sent
- integration_failed

## form_submissions

Fields:

- id
- lead_id
- form_type
- source_page
- payload
- created_at

## resource_downloads

Fields:

- id
- lead_id
- resource_id
- resource_slug
- email
- gated
- access_granted
- created_at

## assessment_sessions

Fields:

- id
- lead_id
- user_id
- status
- assessment_key
- started_at
- completed_at
- source
- created_at
- updated_at

## assessment_answers

Fields:

- id
- session_id
- question_key
- answer_value
- answer_text
- created_at

## assessment_results

Fields:

- id
- session_id
- score
- segment
- maturity_level
- top_recommendations
- next_action
- ai_model
- prompt_version
- raw_ai_response
- validated_json
- created_at

## report_files

Fields:

- id
- assessment_result_id
- file_url
- s3_key
- generated_at
- emailed_at

## integration_events

Fields:

- id
- lead_id
- provider
- event_type
- payload
- status
- retry_count
- error_message
- created_at
- updated_at

Providers:

- hubspot
- clickup
- n8n
- ses
- mailerlite
- columbus
- cal

## audit_logs

Fields:

- id
- actor_type
- actor_id
- action
- entity_type
- entity_id
- payload
- created_at

## Agent-ready fields

The following fields are important for Phase 3:

- intent_type
- segment
- urgency
- source
- raw_input
- structured_payload
- recommended_next_step
- integration status events

Add these early to avoid refactoring later.
