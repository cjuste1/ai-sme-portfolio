'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Copy, Check, Tag, Zap, BarChart2, MessageSquare, Settings, Shield, GraduationCap, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Prompt {
  id: string;
  category: string;
  name: string;
  useCase: string;
  industries: string[];
  template: string;
  variables: string;
  output: string;
  metrics: string;
  notes: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  priority: number; // 1-5
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROMPTS: Prompt[] = [
  // CUSTOMER SERVICE & SUPPORT
  { id: 'CS-01', category: 'Customer Service & Support', name: 'Customer Inquiry Classifier', useCase: 'Automatically classify inbound customer inquiries by type, urgency, and required department to enable fast routing.', industries: ['Healthcare', 'Retail', 'Financial Services', 'Telecom'], template: `You are an expert customer service routing agent. Analyze the following customer inquiry and return a structured classification.\n\nCustomer Message: {{customer_message}}\nChannel: {{channel}}\nCustomer Tier: {{customer_tier}}\n\nClassify and return:\n1. PRIMARY INTENT\n2. URGENCY SCORE (1-5)\n3. SENTIMENT\n4. RECOMMENDED DEPARTMENT\n5. SUGGESTED PRIORITY\n6. INITIAL RESPONSE DRAFT\n7. ESCALATION FLAG`, variables: '{{customer_message}}, {{channel}}, {{customer_tier}}', output: '7 labeled sections: intent, urgency, sentiment, department, priority, draft response, escalation flag', metrics: 'Routing accuracy >90%; avg classification time <3s; escalation precision >85%', notes: 'Add product category variable for retail. Test with angry vs. neutral tone inputs to calibrate urgency scoring.', complexity: 'Intermediate', priority: 5 },
  { id: 'CS-02', category: 'Customer Service & Support', name: 'Empathetic Issue Resolution', useCase: 'Generate empathetic, on-brand customer responses that acknowledge the problem, explain resolution steps, and retain goodwill.', industries: ['Healthcare', 'Financial Services', 'Retail'], template: `You are a senior customer experience specialist. Draft a response to the following customer complaint.\n\nCustomer Issue: {{issue_description}}\nCustomer Name: {{customer_name}}\nIssue Category: {{issue_category}}\nBrand Tone: {{brand_tone}}\nResolution Available: {{resolution_option}}\n\nYour response must:\n- Open with genuine empathy\n- Acknowledge the specific issue clearly\n- Provide the resolution in plain language\n- Set clear expectations\n- Stay under 150 words`, variables: '{{issue_description}}, {{customer_name}}, {{issue_category}}, {{brand_tone}}, {{resolution_option}}', output: 'Single polished response under 150 words', metrics: 'CSAT score post-interaction >4.2/5; repeat contact rate <15%', notes: 'Adjust word count ceiling by channel (chat=100w, email=200w).', complexity: 'Intermediate', priority: 5 },
  { id: 'CS-03', category: 'Customer Service & Support', name: 'FAQ Knowledge Base Builder', useCase: 'Transform raw product/policy documentation into structured FAQ entries ready for knowledge base publishing.', industries: ['Healthcare', 'SaaS', 'Financial Services', 'E-commerce'], template: `You are a knowledge management specialist. Convert the following source document into clean, customer-ready FAQ entries.\n\nSource Document: {{raw_documentation}}\nTarget Audience: {{audience}}\nProduct/Service: {{product_name}}\nTone: {{tone}}\n\nFor each FAQ entry output:\nQ: [Plain-language question]\nA: [Clear answer under 75 words]\nCategory Tag: [billing/account/technical/policy/returns]\nRelated Articles: [2-3 suggested linked topics]\n\nGenerate a minimum of 10 FAQ entries.`, variables: '{{raw_documentation}}, {{audience}}, {{product_name}}, {{tone}}', output: '10+ structured FAQ entries with Q, A, category tag, and related articles', metrics: 'Self-service deflection rate increase >20%; search success rate >75%', notes: 'Run with real call transcripts as source doc for highest-impact FAQs.', complexity: 'Beginner', priority: 4 },
  { id: 'CS-04', category: 'Customer Service & Support', name: 'Escalation Risk Detector', useCase: 'Proactively identify conversations at high risk of escalation before they reach a supervisor.', industries: ['Contact Centers', 'Telecom', 'Financial Services', 'Healthcare'], template: `You are an expert in customer sentiment analysis. Analyze the following conversation transcript and assess escalation risk.\n\nTranscript: {{conversation_transcript}}\nAgent ID: {{agent_id}}\nDuration: {{duration_minutes}} minutes\nChannel: {{channel}}\n\nProvide:\n1. ESCALATION RISK (Low/Medium/High/Critical)\n2. RISK INDICATORS\n3. SENTIMENT TRAJECTORY\n4. RECOMMENDED INTERVENTION\n5. PREDICTED OUTCOME WITHOUT INTERVENTION\n6. AGENT COACHING NOTE`, variables: '{{conversation_transcript}}, {{agent_id}}, {{duration_minutes}}, {{channel}}', output: '6-section risk report with specific transcript references', metrics: 'Escalation prevention rate; supervisor intervention success rate', notes: 'Calibrate risk thresholds by industry.', complexity: 'Advanced', priority: 4 },
  { id: 'CS-05', category: 'Customer Service & Support', name: 'Post-Interaction Survey Analyzer', useCase: 'Analyze open-text CSAT survey responses at scale to extract themes, sentiment trends, and actionable insights.', industries: ['All industries with customer feedback programs'], template: `You are a Voice of Customer analyst. Analyze the following batch of customer survey responses.\n\nSurvey Responses (JSON): {{survey_responses_json}}\nSurvey Period: {{date_range}}\nProduct/Service: {{product_name}}\n\nDeliver:\n1. OVERALL SENTIMENT SUMMARY\n2. TOP 5 POSITIVE THEMES\n3. TOP 5 PAIN POINT THEMES\n4. URGENT ISSUES REQUIRING IMMEDIATE ACTION\n5. TREND vs. PRIOR PERIOD\n6. 3 RECOMMENDED ACTIONS\n7. REPRESENTATIVE VERBATIM QUOTES`, variables: '{{survey_responses_json}}, {{date_range}}, {{product_name}}, {{response_count}}', output: 'Structured executive report with 7 labeled sections', metrics: 'Theme extraction accuracy vs. manual review >88%', notes: 'Test with 50, 200, and 1000 response batches to calibrate output quality.', complexity: 'Intermediate', priority: 4 },
  { id: 'CS-06', category: 'Customer Service & Support', name: 'Live Chat Response Suggester', useCase: 'Generate real-time response suggestions for live chat agents to reduce handle time and improve consistency.', industries: ['E-commerce', 'SaaS', 'Financial Services'], template: `You are an AI assistant supporting a live chat agent. Based on the customer message and context, suggest 3 response options.\n\nCustomer Message: {{latest_customer_message}}\nConversation History: {{chat_history}}\nKnowledge Base Excerpt: {{relevant_kb_content}}\nBrand Voice: {{brand_voice}}\n\nReturn:\nOPTION 1 (Quick Resolution): [Under 30 words]\nOPTION 2 (Empathetic + Solution): [40-60 words]\nOPTION 3 (Clarifying Question): [Under 25 words]\n\nFlag: ESCALATE TO SUPERVISOR: [Yes/No]\nFlag: KNOWLEDGE GAP DETECTED: [Yes/No]`, variables: '{{latest_customer_message}}, {{chat_history}}, {{relevant_kb_content}}, {{brand_voice}}', output: '3 labeled response options + 2 flags', metrics: 'Agent adoption rate of suggestions >60%; AHT reduction >15%', notes: 'A/B test option styles by agent experience level.', complexity: 'Intermediate', priority: 4 },
  { id: 'CS-09', category: 'Customer Service & Support', name: 'Customer Churn Risk Identifier', useCase: 'Analyze customer interaction patterns and signals to identify churn risk and recommend retention actions.', industries: ['SaaS', 'Financial Services', 'Telecom', 'Healthcare'], template: `You are a customer retention analyst. Based on the following customer data, assess churn risk.\n\nCustomer Data: {{customer_data_json}}\nRecent Interactions: {{interaction_summary}}\nProduct Usage Metrics: {{usage_metrics}}\nSubscription Details: {{subscription_details}}\n\nProvide:\n1. CHURN RISK SCORE (0-100)\n2. PRIMARY RISK FACTORS\n3. EARLY WARNING SIGNALS DETECTED\n4. RECOMMENDED RETENTION ACTIONS\n5. OPTIMAL OUTREACH TIMING\n6. OFFER/INCENTIVE RECOMMENDATION\n7. PREDICTED REVENUE AT RISK`, variables: '{{customer_data_json}}, {{interaction_summary}}, {{usage_metrics}}, {{subscription_details}}, {{clv_estimate}}', output: '7-section churn risk report', metrics: 'Prediction accuracy vs. actual churn >75%; retention rate of flagged customers >30%', notes: 'Weight recent interactions 3x more than historical for SaaS.', complexity: 'Advanced', priority: 4 },
  { id: 'CS-10', category: 'Customer Service & Support', name: 'Agent Performance Coaching Script', useCase: 'Generate personalized post-call coaching scripts for supervisors based on specific agent performance data.', industries: ['Contact Centers across all industries'], template: `You are a contact center coaching specialist. Create a coaching session script for the following agent.\n\nAgent Name: {{agent_name}}\nMetric Scorecard: {{metrics_json}}\nSample Transcript: {{transcript_excerpt}}\nPrior Coaching: {{previous_coaching_notes}}\nTenure: {{tenure_months}} months\n\nGenerate a 15-minute coaching script:\n1. OPENING (positive recognition)\n2. PERFORMANCE HIGHLIGHTS\n3. DEVELOPMENT AREA\n4. DEMONSTRATION\n5. PRACTICE SCENARIO\n6. COMMITMENT (SMART goal)\n7. CLOSING`, variables: '{{agent_name}}, {{metrics_json}}, {{transcript_excerpt}}, {{previous_coaching_notes}}, {{tenure_months}}', output: '7-section coaching script for 15-minute session', metrics: 'Agent metric improvement post-coaching; coaching session completion rate', notes: 'Adjust script depth by tenure — newer agents need more demonstration.', complexity: 'Intermediate', priority: 4 },

  // DATA ANALYSIS & REPORTING
  { id: 'DA-01', category: 'Data Analysis & Reporting', name: 'Executive KPI Summary Generator', useCase: 'Transform raw metric data into a concise, insight-driven executive summary for leadership dashboards.', industries: ['Finance', 'Healthcare', 'Retail', 'Operations'], template: `You are a senior data analyst preparing a briefing for the C-suite.\n\nKPI Data: {{kpi_data_json}}\nReporting Period: {{period}}\nBusiness Unit: {{business_unit}}\nStrategic Goals: {{strategic_goals}}\n\nDeliver:\n1. HEADLINE (1 sentence)\n2. PERFORMANCE SNAPSHOT: 5 key metrics — status (🟢/🟡/🔴), value, vs. target\n3. TOP WIN\n4. TOP CONCERN\n5. TREND ANALYSIS\n6. RECOMMENDED ACTIONS: 3 prioritized with owners and deadlines\n7. FORWARD OUTLOOK\n\nNo jargon. Write for a CEO with 90 seconds to read this.`, variables: '{{kpi_data_json}}, {{period}}, {{business_unit}}, {{prior_period_data}}, {{strategic_goals}}', output: '7-section executive summary, scannable in 90 seconds', metrics: 'Executive satisfaction score >4/5; action item adoption rate', notes: 'Add industry benchmarks as a variable to contextualize performance.', complexity: 'Advanced', priority: 5 },
  { id: 'DA-02', category: 'Data Analysis & Reporting', name: 'Root Cause Analysis Generator', useCase: 'Systematically identify root causes of a business performance decline using structured analytical frameworks.', industries: ['Operations', 'Manufacturing', 'Contact Centers', 'Healthcare'], template: `You are a data analyst expert in root cause analysis.\n\nMetric in Decline: {{metric_name}}\nCurrent Value: {{current_value}} vs. Target: {{target_value}}\nDecline Duration: {{decline_duration}}\nAvailable Data: {{supporting_data}}\n\nApply 5-Why + Fishbone analysis:\n\nPROBLEM STATEMENT:\n5-WHY ANALYSIS (Why 1 through Why 5)\nFISHBONE CATEGORIES (People/Process/Technology/Data/External)\nVALIDATED ROOT CAUSE\nEVIDENCE SUPPORTING THIS CONCLUSION\nRECOMMENDED CORRECTIVE ACTIONS\nMONITORING PLAN`, variables: '{{metric_name}}, {{current_value}}, {{target_value}}, {{decline_duration}}, {{supporting_data}}, {{business_context}}', output: 'Structured RCA report with 5-Why + Fishbone + action plan', metrics: 'Root cause identification accuracy (validated post-fix); time to identify vs. manual', notes: 'Pre-load common causes by industry for faster output.', complexity: 'Advanced', priority: 4 },
  { id: 'DA-04', category: 'Data Analysis & Reporting', name: 'Sales Performance Pattern Analyzer', useCase: 'Identify performance patterns, outliers, and growth opportunities from sales data across reps, regions, or products.', industries: ['Retail', 'Financial Services', 'SaaS', 'Manufacturing'], template: `You are a sales analytics specialist.\n\nSales Data: {{sales_data_json}}\nPeriod: {{period}}\nSegmentation: {{segmentation}}\nTargets: {{targets}}\n\nDeliver:\n1. PERFORMANCE DISTRIBUTION (top/middle/bottom 20/60/20)\n2. TOP 3 PATTERNS IDENTIFIED\n3. OUTLIER ANALYSIS\n4. UNDERPERFORMER DIAGNOSIS\n5. PRODUCT/CHANNEL MIX INSIGHTS\n6. GROWTH OPPORTUNITIES: 3 data-backed\n7. FORECAST ADJUSTMENT\n8. RECOMMENDED ACTIONS by segment`, variables: '{{sales_data_json}}, {{period}}, {{segmentation}}, {{targets}}, {{prior_period_data}}', output: '8-section sales pattern report with segmented recommendations', metrics: 'Forecast accuracy improvement; action adoption rate by managers', notes: 'Add cohort analysis variable for SaaS (new vs. expansion vs. renewal).', complexity: 'Advanced', priority: 4 },
  { id: 'DA-07', category: 'Data Analysis & Reporting', name: 'Financial Variance Explainer', useCase: 'Explain financial budget vs. actual variances in plain language with root causes and forward-looking guidance.', industries: ['Finance', 'Corporate FP&A', 'Healthcare', 'Manufacturing'], template: `You are a financial analyst preparing a variance explanation for non-finance stakeholders.\n\nBudget vs. Actual Data: {{variance_data}}\nPeriod: {{period}}\nMateriality Threshold: {{threshold}}\nAudience: {{audience}}\n\nFor each material variance:\nMETRIC / VARIANCE / DIRECTION\nROOT CAUSE EXPLANATION (plain English, 2-3 sentences)\nCONTRIBUTING FACTORS\nMANAGEMENT ACTION\nREVISED FULL-YEAR OUTLOOK IMPACT\n\nEnd with: OVERALL SUMMARY (3 sentences for exec consumption)`, variables: '{{variance_data}}, {{period}}, {{business_unit}}, {{threshold}}, {{audience}}', output: 'Per-variance structured explanations + overall executive summary', metrics: 'Non-finance stakeholder comprehension rate; board question rate reduction', notes: 'Adjust technical depth by audience — CFO wants drivers; board wants implications.', complexity: 'Advanced', priority: 4 },
  { id: 'DA-09', category: 'Data Analysis & Reporting', name: 'Predictive Trend Forecaster', useCase: 'Generate data-backed trend forecasts with confidence intervals and scenario analysis for business planning.', industries: ['Retail', 'Finance', 'Operations', 'Healthcare'], template: `You are a predictive analytics specialist.\n\nHistorical Data: {{historical_data_json}}\nMetric to Forecast: {{metric_name}}\nForecast Horizon: {{forecast_period}}\nKnown External Factors: {{external_factors}}\n\nProduce:\n1. TREND BASELINE\n2. BASE CASE FORECAST (with assumptions)\n3. OPTIMISTIC SCENARIO\n4. PESSIMISTIC SCENARIO\n5. KEY ASSUMPTIONS\n6. CONFIDENCE LEVEL (High/Medium/Low)\n7. LEADING INDICATORS TO WATCH\n8. INFLECTION POINTS\n9. RECOMMENDED PLANNING ACTIONS`, variables: '{{historical_data_json}}, {{metric_name}}, {{forecast_period}}, {{external_factors}}, {{context}}', output: '9-section forecast report with 3 scenarios', metrics: 'Forecast accuracy at 30/60/90 days; planning decision quality', notes: 'Weight recent 12 months 60%, prior periods 40% for most business metrics.', complexity: 'Advanced', priority: 3 },

  // CONTENT GENERATION
  { id: 'CG-01', category: 'Content Generation', name: 'Thought Leadership Article Architect', useCase: 'Structure and draft long-form thought leadership articles that establish AI SME credibility and drive engagement.', industries: ['Professional Services', 'SaaS', 'Consulting', 'Education'], template: `You are a thought leadership content strategist.\n\nTopic: {{article_topic}}\nTarget Audience: {{audience}}\nAuthor's POV/Thesis: {{author_thesis}}\nKey Arguments: {{key_points}}\nTone: {{tone}}\nWord Count: {{word_count}}\nPublication: {{publication}}\n\nStructure:\nHEADLINE OPTIONS: (3 versions)\nHOOK (opening 50 words)\nTHESIS STATEMENT\nSECTION 1-4: [Title + 150 word draft each]\nDATA/PROOF POINTS NEEDED\nCONCLUSION + CTA\nMETA DESCRIPTION (155 characters)`, variables: '{{article_topic}}, {{audience}}, {{author_thesis}}, {{key_points}}, {{tone}}, {{word_count}}, {{publication}}', output: 'Full article structure with 3 headline options, 4 section drafts, and CTA', metrics: 'Engagement rate; email open rate if Substack; inbound leads generated', notes: 'Use your SPARK framework as a structural backbone for AI implementation articles.', complexity: 'Intermediate', priority: 5 },
  { id: 'CG-02', category: 'Content Generation', name: 'LinkedIn Post High-Engagement Writer', useCase: 'Write scroll-stopping LinkedIn posts that drive engagement, build following, and position the author as an AI expert.', industries: ['All professionals building personal brand'], template: `You are a LinkedIn content strategist specializing in thought leadership for AI professionals.\n\nTopic/Insight: {{topic_or_insight}}\nAuthor's Unique Angle: {{unique_perspective}}\nTarget Audience: {{target_audience}}\nGoal: {{goal}}\nTone: {{tone}}\nPost Length: {{length}}\n\nDeliver:\nHOOK LINE (makes them click "see more")\nFULL POST (formatted, no walls of text)\nHASHTAGS (5 relevant)\nENGAGEMENT PROMPT\nOPTIMAL POST TIME\nA/B HOOK VARIANT`, variables: '{{topic_or_insight}}, {{unique_perspective}}, {{target_audience}}, {{goal}}, {{tone}}, {{length}}', output: 'Complete LinkedIn post with hook, body, hashtags, and engagement prompt', metrics: 'Impression-to-engagement rate >4%; comment rate; follower growth', notes: 'Pattern interrupt in hook dramatically outperforms question hooks.', complexity: 'Beginner', priority: 5 },
  { id: 'CG-03', category: 'Content Generation', name: 'Case Study Narrative Builder', useCase: 'Transform raw project data into a compelling client case study that proves ROI and drives consulting inquiries.', industries: ['Consulting', 'SaaS', 'Healthcare', 'Financial Services'], template: `You are a B2B content strategist specializing in case studies.\n\nClient Industry: {{industry}}\nChallenge: {{client_challenge}}\nSolution: {{solution_description}}\nResults: {{results_data}}\nTimeline: {{project_timeline}}\n\nStructure:\nTITLE (results-focused, include a metric)\nEXECUTIVE SUMMARY (3 sentences)\nTHE CHALLENGE (150 words)\nTHE SOLUTION (200 words)\nIMPLEMENTATION HIGHLIGHTS (3 key decisions)\nTHE RESULTS (metrics-first)\nKEY LEARNINGS\nCTA`, variables: '{{industry}}, {{company_size}}, {{client_challenge}}, {{solution_description}}, {{results_data}}, {{project_timeline}}', output: 'Complete case study with all 9 sections, ~600-800 words', metrics: 'Case study view-to-inquiry conversion rate; download rate', notes: 'Lead with the hardest metric in the title. Buyers scan for numbers before reading.', complexity: 'Intermediate', priority: 5 },
  { id: 'CG-05', category: 'Content Generation', name: 'AI Use Case One-Pager Creator', useCase: 'Create a concise one-pager explaining an AI use case for non-technical executive audiences.', industries: ['All industries — for internal pitch or client proposal'], template: `You are a business communication specialist.\n\nAI Use Case: {{use_case_name}}\nTarget Industry: {{industry}}\nBusiness Problem: {{problem}}\nHow the AI Works: {{solution_summary}}\nExpected ROI: {{roi_data}}\nImplementation Complexity: {{complexity}}\nAudience: {{audience}}\n\nOne-Pager Structure:\nHEADER (use case + industry + tagline)\nTHE PROBLEM (2-3 bullets)\nTHE AI SOLUTION (3-4 bullets)\nBUSINESS IMPACT (metrics-first)\nHOW IT WORKS (3-step process)\nWHAT YOU NEED TO START\nNEXT STEP / CTA`, variables: '{{use_case_name}}, {{industry}}, {{problem}}, {{solution_summary}}, {{roi_data}}, {{complexity}}, {{time_to_value}}, {{audience}}', output: 'Complete one-pager content in 7 sections, ready for Canva layout', metrics: 'Executive meeting acceptance rate; follow-up meeting conversion', notes: "Replace technical terms with business outcomes. 'NLP' becomes 'reads customer emails automatically.'", complexity: 'Beginner', priority: 4 },
  { id: 'CG-06', category: 'Content Generation', name: 'Proposal & Scope of Work Generator', useCase: 'Generate professional client proposals and scopes of work for AI consulting engagements.', industries: ['Consulting', 'Professional Services', 'Technology'], template: `You are a senior AI consultant.\n\nClient: {{client_name}}\nIndustry: {{industry}}\nProblem: {{problem}}\nProposed Solution: {{solution_overview}}\nEngagement Type: {{engagement_type}}\nTimeline: {{timeline}}\nBudget: {{budget}}\n\nGenerate a complete proposal:\nEXECUTIVE SUMMARY\nUNDERSTANDING OF YOUR CHALLENGE\nPROPOSED APPROACH (phased)\nSCOPE OF WORK\nOUT OF SCOPE\nTIMELINE\nINVESTMENT\nOUR QUALIFICATIONS\nNEXT STEPS\nTERMS`, variables: '{{client_name}}, {{industry}}, {{problem}}, {{solution_overview}}, {{engagement_type}}, {{timeline}}, {{budget}}, {{stakeholders}}', output: 'Complete 10-section client proposal', metrics: 'Proposal win rate; time-to-proposal; client feedback quality', notes: "Mirror the client's language from their intake materials. Familiarity builds trust.", complexity: 'Advanced', priority: 4 },

  // PROCESS AUTOMATION
  { id: 'PA-01', category: 'Process Automation', name: 'Workflow Inefficiency Identifier', useCase: 'Analyze a business process and identify automation opportunities, bottlenecks, and inefficiency patterns.', industries: ['Operations', 'HR', 'Finance', 'Healthcare', 'Manufacturing'], template: `You are a process automation expert.\n\nProcess Name: {{process_name}}\nProcess Description: {{process_description}}\nCurrent Tools: {{current_tools}}\nTeam Size: {{team_size}}\nFrequency: {{frequency}}\nTime per Cycle: {{time_per_cycle}} hours\nPain Points: {{pain_points}}\n\nDeliver:\n1. PROCESS MAP SUMMARY\n2. AUTOMATION OPPORTUNITY SCORE (0-100)\n3. TOP 5 INEFFICIENCIES (ranked)\n4. AUTOMATION CANDIDATES\n5. AUGMENTATION CANDIDATES\n6. RECOMMENDED AUTOMATION STACK\n7. ESTIMATED ROI\n8. IMPLEMENTATION PRIORITY\n9. RISKS & DEPENDENCIES`, variables: '{{process_name}}, {{process_description}}, {{current_tools}}, {{team_size}}, {{frequency}}, {{time_per_cycle}}, {{pain_points}}', output: '9-section automation opportunity report', metrics: 'Automation opportunity accuracy; ROI realization rate; time-to-automation', notes: 'Focus on frequency x time first — daily 2hr processes beat monthly 8hr processes.', complexity: 'Intermediate', priority: 4 },
  { id: 'PA-03', category: 'Process Automation', name: 'Meeting Efficiency Optimizer', useCase: 'Transform meeting notes and action items into structured outputs that drive follow-through.', industries: ['All corporate environments'], template: `You are a meeting productivity specialist.\n\nMeeting Type: {{meeting_type}}\nAttendees: {{attendees_and_roles}}\nMeeting Notes: {{meeting_notes}}\nDuration: {{duration}} minutes\n\nGenerate:\n1. MEETING SUMMARY (3-5 sentences)\n2. KEY DECISIONS MADE\n3. ACTION ITEMS TABLE (Action | Owner | Due Date | Priority)\n4. OPEN QUESTIONS\n5. FOLLOW-UP EMAIL DRAFT\n6. CALENDAR INVITES NEEDED\n7. DOCUMENTS TO CREATE\n8. MEETING EFFECTIVENESS SCORE (1-10)`, variables: '{{meeting_type}}, {{attendees_and_roles}}, {{meeting_notes}}, {{prior_actions}}, {{duration}}', output: '8-section meeting output package including ready-to-send email', metrics: 'Action item completion rate; follow-up meeting reduction', notes: 'The follow-up email is the highest-ROI output — creates accountability instantly.', complexity: 'Beginner', priority: 4 },
  { id: 'PA-06', category: 'Process Automation', name: 'Contract & Agreement Summarizer', useCase: 'Extract and summarize key terms, obligations, risks, and deadlines from contracts for non-legal stakeholders.', industries: ['Legal', 'Finance', 'Operations', 'Healthcare', 'Real Estate'], template: `You are a legal document analyst.\n\nContract Type: {{contract_type}}\nParties: {{parties}}\nContract Text: {{contract_text}}\nReader Role: {{reader_role}}\nFocus Areas: {{focus_areas}}\n\nExtract and summarize:\n1. AGREEMENT OVERVIEW\n2. KEY FINANCIAL TERMS\n3. OBLIGATIONS SUMMARY\n4. CRITICAL DEADLINES (table)\n5. TERMINATION CONDITIONS\n6. RISK FLAGS\n7. AUTO-RENEWAL ALERTS\n8. MISSING OR VAGUE TERMS\n9. RECOMMENDED ACTIONS\n\nDisclaimer: This is a business summary, not legal advice.`, variables: '{{contract_type}}, {{parties}}, {{contract_text}}, {{reader_role}}, {{focus_areas}}', output: '9-section contract summary with risk flags and action items', metrics: 'Review time reduction; risk flag identification rate; stakeholder comprehension', notes: 'Always flag auto-renewal clauses as #1 priority — most costly oversight.', complexity: 'Intermediate', priority: 4 },
  { id: 'PA-08', category: 'Process Automation', name: 'Budget Request & Business Case Builder', useCase: 'Structure compelling business cases and budget requests for AI initiatives that win executive approval.', industries: ['All industries requesting AI investment'], template: `You are a financial analyst and business strategist.\n\nInitiative: {{initiative_name}}\nRequested Budget: {{budget_request}}\nProblem: {{problem}}\nSolution: {{solution}}\nExpected Benefits: {{expected_benefits}}\nAudience: {{audience}}\n\nCreate:\n1. EXECUTIVE SUMMARY (1 page)\n2. PROBLEM QUANTIFICATION ($)\n3. PROPOSED SOLUTION\n4. FINANCIAL MODEL (3-year cost vs. benefit)\n5. ROI CALCULATION (payback period, NPV)\n6. RISK ANALYSIS (top 3)\n7. ALTERNATIVES ANALYSIS\n8. IMPLEMENTATION PLAN\n9. SUCCESS METRICS\n10. THE ASK`, variables: '{{initiative_name}}, {{budget_request}}, {{duration}}, {{problem}}, {{solution}}, {{expected_benefits}}, {{risks}}, {{alternatives}}, {{audience}}', output: '10-section business case with financial model structure', metrics: 'Approval rate; budget utilization vs. plan; actual ROI vs. projected at 12 months', notes: 'Lead with the cost of inaction — decision-makers approve budgets to stop pain.', complexity: 'Advanced', priority: 4 },

  // QUALITY ASSURANCE
  { id: 'QA-01', category: 'Quality Assurance', name: 'AI Output Quality Evaluator', useCase: 'Systematically evaluate AI-generated content for accuracy, tone, safety, and business alignment before deployment.', industries: ['Healthcare', 'Financial Services', 'Legal', 'All AI-deploying industries'], template: `You are an AI quality assurance specialist.\n\nAI Output to Review: {{ai_output}}\nOriginal Prompt/Intent: {{original_prompt}}\nUse Case Context: {{use_case}}\nTarget Audience: {{audience}}\nCompliance Requirements: {{compliance_requirements}}\n\nEvaluate on each dimension (score 1-5 + explanation):\n1. FACTUAL ACCURACY\n2. TONE & VOICE\n3. COMPLETENESS\n4. SAFETY & BIAS\n5. REGULATORY COMPLIANCE\n6. BRAND ALIGNMENT\n\nOVERALL QA SCORE (weighted)\nPASS/FAIL DECISION\nREQUIRED EDITS (specific)\nPROMPT IMPROVEMENT SUGGESTION`, variables: '{{ai_output}}, {{original_prompt}}, {{use_case}}, {{audience}}, {{criteria}}, {{compliance_requirements}}', output: '6-dimension scored evaluation with pass/fail decision and edit requirements', metrics: 'Error detection rate vs. human review; time-to-QA; false positive/negative rate', notes: 'Calibrate scoring thresholds by use case — customer-facing needs 4.5+; internal 3.5+ acceptable.', complexity: 'Advanced', priority: 5 },
  { id: 'QA-02', category: 'Quality Assurance', name: 'Call/Chat Transcript Quality Scorer', useCase: 'Score agent interactions against quality rubrics and generate coaching-ready feedback reports.', industries: ['Contact Centers across all industries'], template: `You are a contact center quality assurance analyst.\n\nTranscript: {{transcript}}\nAgent ID: {{agent_id}}\nChannel: {{channel}}\nCustomer Outcome: {{customer_outcome}}\n\nScore each category (1-5) with transcript evidence:\n1. GREETING & RAPPORT\n2. NEEDS IDENTIFICATION\n3. SOLUTION QUALITY\n4. COMMUNICATION CLARITY\n5. EMPATHY & DE-ESCALATION\n6. COMPLIANCE ADHERENCE\n7. PRODUCT/SERVICE KNOWLEDGE\n8. EFFICIENCY\n9. CLOSING & RESOLUTION CONFIRMATION\n10. FOLLOW-UP COMMITMENT\n\nTOTAL SCORE /50\nTOP STRENGTH\nPRIMARY DEVELOPMENT AREA\nCOACHING PRIORITY`, variables: '{{transcript}}, {{agent_id}}, {{channel}}, {{interaction_type}}, {{qa_rubric}}, {{customer_outcome}}', output: '10-category scored QA report with coaching priority and escalation flag', metrics: 'QA score calibration rate; agent score improvement trend; CSAT correlation', notes: 'Anchor scoring with transcript quotes — removes subjectivity and creates coaching evidence.', complexity: 'Intermediate', priority: 4 },
  { id: 'QA-04', category: 'Quality Assurance', name: 'Content Compliance Reviewer', useCase: 'Review marketing, customer, or regulatory content for compliance violations before publication or distribution.', industries: ['Healthcare', 'Financial Services', 'Legal', 'Pharma'], template: `You are a compliance content reviewer.\n\nContent to Review: {{content_text}}\nContent Type: {{content_type}}\nRegulatory Framework: {{regulatory_framework}}\nIndustry: {{industry}}\nAudience: {{audience}}\n\nReview and flag:\n1. REGULATORY VIOLATIONS (with rule reference)\n2. REQUIRED DISCLOSURES MISSING\n3. PROHIBITED LANGUAGE\n4. ACCURACY CONCERNS\n5. FAIR BALANCE ISSUES\n6. ACCESSIBILITY CONCERNS\n\nCOMPLIANCE SCORE (0-100)\nPUBLICATION DECISION (Approved/Changes/Rejected)\nREQUIRED CHANGES (specific edits)\nLEGAL REVIEW NEEDED (yes/no)`, variables: '{{content_text}}, {{content_type}}, {{regulatory_framework}}, {{industry}}, {{channel}}, {{audience}}', output: '6-dimension compliance review with publication decision and required changes', metrics: 'Violation detection rate vs. legal review; time-to-review reduction; compliance incident rate', notes: 'Healthcare and financial services need the most rigorous prompts.', complexity: 'Advanced', priority: 4 },

  // TRAINING & ONBOARDING
  { id: 'TO-01', category: 'Training & Onboarding', name: 'New Employee AI Tools Orientation', useCase: 'Create a structured AI tools orientation program for new hires entering AI-forward organizations.', industries: ['All industries implementing AI tools'], template: `You are an AI adoption specialist.\n\nOrganization Type: {{org_type}}\nEmployee Role: {{role}}\nAI Tools in Use: {{tool_list}}\nPrior Experience: {{prior_experience}}\nOrientation Duration: {{duration}}\n\nDesign orientation program:\nDAY 1 AGENDA (timed)\nTOOL-BY-TOOL GUIDE for each tool:\n  - What it does (plain English)\n  - When to use it\n  - Getting started (3 steps)\n  - Common mistakes\n  - 10-minute exercise\nTRUST & ETHICS MODULE\nQUICK REFERENCE CARD (1-page)\nKNOWLEDGE CHECK (5 questions)\n30-DAY ADOPTION MILESTONES`, variables: '{{org_type}}, {{role}}, {{tool_list}}, {{prior_experience}}, {{duration}}, {{outcomes}}', output: 'Complete orientation program with agenda, tool guides, quick reference card, and 30-day milestones', metrics: 'Tool adoption rate at 30 days; productivity ramp time; knowledge check score', notes: 'The quick reference card is the most-used artifact — design for the desk.', complexity: 'Beginner', priority: 4 },
  { id: 'TO-02', category: 'Training & Onboarding', name: 'AI Prompt Writing Skills Trainer', useCase: 'Teach employees how to write effective prompts for AI tools through structured exercises and feedback frameworks.', industries: ['All corporate environments adopting AI'], template: `You are a prompt engineering trainer.\n\nAudience: {{audience}}\nAI Tools They Use: {{tools}}\nPrior Experience: {{experience_level}}\nTraining Duration: {{duration}} hours\nIndustry Context: {{industry}}\n\nTraining Program:\nLEARNING OBJECTIVES (5)\nTHE ANATOMY OF A GOOD PROMPT\nCOMMON MISTAKES (top 5 with before/after)\nEXERCISE 1 - BASIC PROMPTING\nEXERCISE 2 - ROLE + CONTEXT + TASK\nEXERCISE 3 - ITERATION PRACTICE\nEXERCISE 4 - INDUSTRY-SPECIFIC\nQUICK REFERENCE CARD\nASSESSMENT (5 prompts to write)\nCERTIFICATION CRITERIA`, variables: '{{audience}}, {{tools}}, {{experience_level}}, {{duration}}, {{industry}}, {{use_cases}}', output: 'Complete prompt training program with 4 exercises and assessment', metrics: 'Pre/post prompt quality score; task completion rate; time-to-task with AI vs. without', notes: 'Exercise 3 (iteration practice) produces highest skill transfer.', complexity: 'Beginner', priority: 4 },
  { id: 'TO-03', category: 'Training & Onboarding', name: 'Change Management Communication Planner', useCase: 'Create a structured change communication plan for AI implementation rollouts that drives adoption and reduces resistance.', industries: ['Healthcare', 'Finance', 'Manufacturing', 'All industries implementing AI'], template: `You are a change management specialist.\n\nInitiative Name: {{initiative_name}}\nWhat's Changing: {{changes_description}}\nAffected Groups: {{stakeholder_groups}}\nTimeline: {{rollout_timeline}}\nKnown Resistance: {{anticipated_resistance}}\n\nCreate a 12-week communication plan:\nSTAKEHOLDER ANALYSIS\nCOMMUNICATION OBJECTIVES\nMESSAGING FRAMEWORK\nCHANNEL STRATEGY\nWEEK-BY-WEEK CALENDAR (all touchpoints)\nKEY MESSAGE LIBRARY (5 core messages)\nFAQ DOCUMENT (top 15 Q&A)\nRESISTANCE RESPONSE GUIDE\nSUCCESS INDICATORS\nFEEDBACK LOOPS`, variables: '{{initiative_name}}, {{changes_description}}, {{stakeholder_groups}}, {{rollout_timeline}}, {{anticipated_resistance}}, {{sponsor}}, {{champions}}', output: 'Complete 12-week communication plan with calendar, message library, and resistance guide', metrics: 'Awareness rate at go-live >90%; adoption rate at 30/60/90 days', notes: 'Resistance is information — build feedback mechanisms from day 1.', complexity: 'Intermediate', priority: 4 },
  { id: 'TO-05', category: 'Training & Onboarding', name: 'AI Ethics & Responsible Use Policy Trainer', useCase: 'Create training content that builds responsible AI use habits and ethical decision-making skills in employees.', industries: ['Healthcare', 'Finance', 'Legal', 'Education', 'All regulated industries'], template: `You are an AI ethics trainer.\n\nOrganization Type: {{org_type}}\nAudience: {{audience}}\nRegulations: {{regulations}}\nAI Tools in Scope: {{tools_in_scope}}\nRisk Areas: {{risk_areas}}\n\nTraining Content:\nMODULE 1 - WHY AI ETHICS MATTERS\nMODULE 2 - OUR AI USE POLICY (plain language)\nMODULE 3 - WHAT TO NEVER PUT IN AI TOOLS\nMODULE 4 - BIAS RECOGNITION\nMODULE 5 - VERIFICATION HABITS\nMODULE 6 - ESCALATION GUIDE\nSCENARIO LIBRARY (10 real-world dilemmas)\nPOLICY ACCEPTANCE ACKNOWLEDGMENT\nREFRESH REMINDER PLAN (quarterly)`, variables: '{{org_type}}, {{audience}}, {{regulations}}, {{tools_in_scope}}, {{risk_areas}}, {{policy_docs}}, {{duration}}', output: '9-module ethics training program with scenario library and policy acknowledgment', metrics: 'Policy violation rate post-training; scenario assessment score; AI incident rate', notes: 'Scenario-based learning drives 4x better policy retention than lecture-style.', complexity: 'Intermediate', priority: 4 },
];

// ─── Constants ─────────────────────────────────────────────────────────────
const CATEGORIES = [...new Set(PROMPTS.map(p => p.category))];
const COMPLEXITIES = ['Beginner', 'Intermediate', 'Advanced'];
const ALL_INDUSTRIES = [...new Set(PROMPTS.flatMap(p => p.industries))].sort();

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Customer Service & Support': MessageSquare,
  'Data Analysis & Reporting': BarChart2,
  'Content Generation': Zap,
  'Process Automation': Settings,
  'Quality Assurance': Shield,
  'Training & Onboarding': GraduationCap,
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Customer Service & Support': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-400' },
  'Data Analysis & Reporting':  { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  'Content Generation':         { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30', dot: 'bg-violet-400' },
  'Process Automation':         { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  'Quality Assurance':          { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', dot: 'bg-rose-400' },
  'Training & Onboarding':      { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', dot: 'bg-cyan-400' },
};

const COMPLEXITY_STYLES: Record<string, string> = {
  Beginner:     'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Advanced:     'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

// ─── Sub-components ────────────────────────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-xs ${i <= count ? 'text-amber-400' : 'text-neutral-700'}`}>★</span>
      ))}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy Prompt'}
    </button>
  );
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [expanded, setExpanded] = useState(false);
  const colors = CATEGORY_COLORS[prompt.category] || CATEGORY_COLORS['Content Generation'];
  const Icon = CATEGORY_ICONS[prompt.category] || Zap;

  return (
    <div className={`group relative rounded-2xl border bg-neutral-900/60 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900/80 ${expanded ? 'border-white/20 shadow-xl shadow-black/20' : 'border-white/8 hover:border-white/15'}`}>
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
              <Icon className={`w-4 h-4 ${colors.text}`} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{prompt.id}</span>
              <h3 className="text-sm font-semibold text-white leading-tight">{prompt.name}</h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <StarRating count={prompt.priority} />
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${COMPLEXITY_STYLES[prompt.complexity]}`}>
              {prompt.complexity}
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed mb-3">{prompt.useCase}</p>

        {/* Industry tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {prompt.industries.slice(0, 3).map(ind => (
            <span key={ind} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/8">{ind}</span>
          ))}
          {prompt.industries.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-500 border border-white/8">+{prompt.industries.length - 3}</span>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-xs font-medium transition-all ${expanded ? 'bg-white/8 text-white' : 'bg-white/4 text-neutral-400 hover:bg-white/8 hover:text-white'}`}
        >
          <span>{expanded ? 'Hide Details' : 'View Full Prompt & Details'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/8 p-5 space-y-4">
          {/* Prompt Template */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">Prompt Template</span>
              <CopyButton text={prompt.template} />
            </div>
            <pre className="text-[11px] text-neutral-300 bg-black/40 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-white/5 font-mono">
              {prompt.template}
            </pre>
          </div>

          {/* 3-col details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white/3 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">Input Variables</span>
              <p className="text-[11px] text-neutral-300 leading-relaxed">{prompt.variables}</p>
            </div>
            <div className="bg-white/3 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">Expected Output</span>
              <p className="text-[11px] text-neutral-300 leading-relaxed">{prompt.output}</p>
            </div>
            <div className="bg-white/3 rounded-xl p-3 border border-white/5">
              <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">Performance Metrics</span>
              <p className="text-[11px] text-neutral-300 leading-relaxed">{prompt.metrics}</p>
            </div>
          </div>

          {/* Iteration Notes */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">💡 Iteration Notes</span>
            <p className="text-[11px] text-amber-200/70 leading-relaxed">{prompt.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function PromptsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeComplexity, setActiveComplexity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return PROMPTS.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.useCase.toLowerCase().includes(q) ||
        p.industries.some(i => i.toLowerCase().includes(q)) ||
        p.id.toLowerCase().includes(q);
      const matchCat = !activeCategory || p.category === activeCategory;
      const matchComp = !activeComplexity || p.complexity === activeComplexity;
      return matchSearch && matchCat && matchComp;
    });
  }, [search, activeCategory, activeComplexity]);

  const categoryCounts = useMemo(() =>
    CATEGORIES.reduce((acc, cat) => ({
      ...acc,
      [cat]: PROMPTS.filter(p => p.category === cat).length
    }), {} as Record<string, number>)
  , []);

  const clearFilters = () => {
    setSearch('');
    setActiveCategory(null);
    setActiveComplexity(null);
  };

  const hasFilters = search || activeCategory || activeComplexity;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-neutral-950 to-neutral-950" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-56 h-56 bg-accent-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-medium mb-6">
            <Tag className="w-3.5 h-3.5" />
            Enterprise Prompt Library
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-4 bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            50+ Production-Ready Prompts
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-10">
            Battle-tested prompt templates across 6 enterprise categories. Each includes use case, variables, expected output, performance metrics, and iteration notes.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {CATEGORIES.map(cat => {
              const colors = CATEGORY_COLORS[cat];
              const Icon = CATEGORY_ICONS[cat] || Zap;
              return (
                <div key={cat} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${colors.bg} ${colors.border}`}>
                  <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                  <span className={`text-xs font-medium ${colors.text}`}>{categoryCounts[cat]}</span>
                  <span className="text-xs text-neutral-400">{cat}</span>
                </div>
              );
            })}
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by name, industry, use case, or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-0 z-20 bg-neutral-950/80 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${showFilters ? 'border-primary-500/50 bg-primary-500/10 text-primary-300' : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/20'}`}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>

            {/* Category pills */}
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map(cat => {
                const colors = CATEGORY_COLORS[cat];
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(active ? null : cat)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium border transition-all ${active ? `${colors.bg} ${colors.text} ${colors.border}` : 'bg-transparent border-white/8 text-neutral-500 hover:text-neutral-300 hover:border-white/15'}`}
                  >
                    {cat.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Complexity filter (shown when filters open) */}
            {showFilters && (
              <div className="flex gap-1.5">
                {COMPLEXITIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setActiveComplexity(activeComplexity === c ? null : c)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium border transition-all ${activeComplexity === c ? COMPLEXITY_STYLES[c] : 'bg-transparent border-white/8 text-neutral-500 hover:text-neutral-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {/* Result count + clear */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-neutral-500">
                <span className="text-white font-medium">{filtered.length}</span> prompt{filtered.length !== 1 ? 's' : ''}
              </span>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 transition-colors">
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-sm">No prompts match your filters.</p>
            <button onClick={clearFilters} className="mt-3 text-primary-400 hover:text-primary-300 text-sm underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-10 text-center">
          <h2 className="text-2xl font-bold font-display mb-3">Want the Full Library?</h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
            Download all 50+ prompts with complete documentation, iteration notes, and industry tags — ready for your enterprise AI implementation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
          >
            Download Full Prompt Library
          </a>
        </div>
      </section>
    </div>
  );
}
