# 04 — Payload CMS Content Model

## Purpose

Payload CMS is the content source of truth. Marketing copy must be editable by the TBG team without developer support.

## Collections

### Pages

Fields:

- title
- slug
- status: draft | published
- page_type: standard | program | organization | proof | resource_hub | contact
- audience: individual | executive | organization | mixed
- navigation_label
- show_in_navigation
- blocks
- seo
- published_at
- updated_by

### Navigation

Fields:

- label
- href
- order
- parent
- audience
- is_external
- open_in_new_tab
- status

### Blog Posts / Insights

Fields:

- title
- slug
- excerpt
- body
- author
- tags
- categories
- publish_date
- featured_image
- faq_blocks
- citations
- seo
- status

### Resources

Fields:

- title
- slug
- resource_type: template | worksheet | scorecard | whitepaper | glossary | guide
- description
- file
- gated: boolean
- form_fields_required
- audience
- tags
- followup_sequence_key
- seo
- status

### Case Studies

Fields:

- title
- slug
- client_name
- industry
- challenge
- solution
- outcome
- metrics
- testimonial_quote
- file
- public: boolean
- seo

### Testimonials

Fields:

- name
- title
- company
- quote
- photo
- related_page
- featured

### FAQs

Fields:

- question
- answer
- category
- related_page
- schema_ready
- status

### Team / Advisory Board

Fields:

- name
- role
- bio
- image
- social_links
- display_order
- status

### Global Settings

Fields:

- site_name
- default_seo_title
- default_seo_description
- logo
- footer_copy
- contact_email
- social_links
- hubspot_form_ids
- cal_link
- columbus_embed_settings

## Page blocks

### Hero Block

Use for top section of major pages.

Fields:

- eyebrow
- headline
- subheadline
- primary_cta_label
- primary_cta_href
- secondary_cta_label
- secondary_cta_href
- media
- trust_note

### Journey Selector Block

Use on Home.

Fields:

- headline
- description
- doors:
  - label
  - audience
  - description
  - href
  - cta_label

### Program Overview Block

Use for AI Fluency Cohort and Solomon Engine.

Fields:

- program_name
- audience
- short_description
- duration
- format
- outcomes
- included_items
- cta

### Phase / Step Block

Use for phase-based learning tracks.

Fields:

- title
- intro
- steps:
  - title
  - description
  - duration
  - outcome
  - note

### CTA Block

Fields:

- headline
- description
- cta_label
- cta_href
- variant

### Resource Download Block

Fields:

- resource
- headline
- description
- gated
- form_variant
- success_message

### Gated Form Block

Fields:

- form_type
- headline
- description
- required_fields
- submit_label
- hubspot_mapping_key
- success_action

### FAQ Block

Fields:

- heading
- items
- render_schema

### Assistant Embed Block

Fields:

- assistant_name
- assistant_type
- embed_mode
- display_rules
- fallback_cta

### Assessment Embed Block

Fields:

- assessment_key
- title
- description
- gated
- cta_label
- placeholder_mode

### Case Study Preview Block

Fields:

- heading
- selected_case_studies
- display_mode
- cta

### Pricing / Tier Block

Fields:

- heading
- tiers:
  - name
  - price_label
  - description
  - features
  - cta
  - note

## Required CMS rules

- No frontend page should contain hardcoded marketing copy.
- Navigation should be CMS-configurable or driven by one source config.
- SEO fields must exist on every page and blog post.
- Resource gating must connect to FastAPI, not just frontend state.
- Columbus embed settings should be controlled globally.
