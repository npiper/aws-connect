# AWS CONNECT

## Sample Sales Data

https://www.kaggle.com/kyanyoga/sample-sales-data

## Open Source CRM

https://github.com/javanile/vtiger-demo

https://www.vtiger.com/integrations/

https://www.vtiger.com/insurance-crm/

# Setting up a New Contact Centre


## Questions

How many regions / departments are you planning on / currently use? (e.g. Region/Deparment/Team/..)

How do you roster your staff? Is there any 'surge' capacity to bring in offline agents? 
 (Status defaults:  Routable, Offline)



How many dedicated call centre lines / queues do you need?

What hierarchy of agents do you have / want?

How many current phone numbers?

Example of your current IVR system?

What are your agents allowed to do / read, interact with?
What are your call centre managers allowed to do / read, interact with and have authority on?

What are the hours of operation for each service unit?

What applications do Agents have access to as a 'Control Panel'?
What applications do Team leads have access to as a 'Control Panel'?

How many concurrent chats should an agent handle?

What KPI's do  / would you like to monitor?

What current bottlenecks are there that could be self-serve options?

What information would improve your customer engagement / call resolution - any new integrations?

How important is omni-channel consistency?


Who should have authority to add/update users and permissions?
( Admin, Agen, Call Centre Manager, Quality analyst) are default profiles

Example permissions:  Routing, Contact Flows,  Users, Metrics, Changes, Prompts, Phone numbers, ControlPanel

Can an agent belong to multiple groups / service centres? (Tip:  Use an Agent Hierarchy - up to 5 levels)

Region --> Department --> Team ...


Are there tiers of service levels where an agent might redirect a call? (e.g. Level 2 support?) (Quick connect destinations, re-connecting to an agent, 3rd parties, >1 agent needed on a call)

Numbers are in E.164 format (+44 UK Mobile)

# Chatbots

* Bots are per region

* Bots can create intents with associated utterances

* Integrate to a Connect contact flow - add a Customer input step with the designed intents to route to a queue

* 15-20 utterances per intent, include variations to account for incorrect spelling/transcriptions

* Use Lex reporting for Missed/Hit utterances to tune bots

## Polly - Text to speech

Use / test your Text to speech prompts with Polly from AWS Console to hear your prompts without calling in

Using SSML add accents/phonemes to add personality by leveraging the International phonetic alphabet and Extended speech assessment methods phonetic alphabet (X-SAMPA) elements.

https://docs.aws.amazon.com/polly/latest/dg/phonemetables.html

SSML == 'Synthesized speech markup language'

# Integration to other services

* Enable permissions for the Integration

* Write a function to perform the Integration

* Insert the function into your contact flows

Building Blocks:

* AWS IAM
* AWS Lambda
* (Connecting Services) e.g. Dynamo DB, API Gateway

## Example permissions

* Lambda to backing service

IAM Role for the Lambda Function e.g. LambdaFullAccess (includes DynamoDB permissions)


* Connect to Lambda

Create Function - Author from scratch

Execution role - 'myLambdaConnectRole'

Return caller information like a single JSON object

* Contact flows

Add the Lambda function to AWS Connect and contact flow

Login as Administrator

Use 'Integrate' and 'Invoke AWS Lambda Function' step

Set Contact Attributes from the 'Success' flow
Destination Key, Type: External, Attribute: firstName, Attribute: lastName

System attributes - also can use ( Agent, Queue Metrics, User Defined, External, Lex Slots, Lex Attributes, Media Streams)

https://docs.aws.amazon.com/connect/latest/adminguide/connect-contact-attributes.html

Execution role - 'myLambdaConnectRole'
Publish contact flow


# Contact Centre Metrics and Logs

AWS Cloudwatch logs
Out of the box reporting and custom reports, dashboards
Amazon S3 (Streaming data) has the raw data

Utilise stream processing like Kinesis from these sources into a Data Lake / Warehouse like Redshift.

## Sample Metrics / Reports

Percentage of calls answered within SLA
'Occupancy rate' = Agent contact % with customers (Queue level metric)
Average hold time
Number of agents available
Number of agents on call
Agents performing 'non-productive' tasks

## Parameters

* Range of time
* Which Queues
* Target Occupancy, Service levels
* Time target for service level
* % of calls answered within 30,45,... 120 seconds


## Real time metrics

Agents (Missed, Occupancy)
Contacts
Performance

Updates every 15 seconds

CTR driven metrics - 'Connect trace records (Paths)' - Service level, call duration, after contact work time
Agent activity metrics - Agent status changes, Agent conversation changes, e.g. contact time, idle time, non productive time

Can be split / aggregated based on Queues, Agents, Routing Profiles

https://docs.aws.amazon.com/connect/latest/adminguide/real-time-metrics-definitions.html

## Historical reports

Aggregated based on Queues, Agent(s), Routing Profiles, Phone Numbers, Agent Hierarchy levels

Over a certain time frame, for grouping - can be scheduled (recurring) e.g. per week

Grouping options allow aggregation 

Typically Queue and Agent metrics

Schedule can be delivered to S3 locations

https://docs.aws.amazon.com/connect/latest/adminguide/historical-metrics-definitions.html (Historical metrics)

## Other reports

Login/logout reports
Contact search - recorded calls, chat transcripts
Contact Lens for Amazon connect ( Transcript, Sentiment analysis)


## Troubleshoot

Usually CCP (Contact control panel)
Networking , SysAdmins and Virtual Desktop infra solutions team

Amazon connect check connectivity tool 
Web browsers - latest Mozilla, Chrome, Firefox
Give soft phone / microphone has required permissions

CCP does not initialise
Periodic connection errors (Network)
Missed calls, state change delays, CCP unresponsiveness

Tip:  Ensure latency and call quality is within an acceptable range for your use case

Cloudwatch logs - a log entry is added as each block in your contact flow is triggered.
Cloudwatch events can send alerts on unexpected errors
Use to optimise customer experience


## Extending

AWS Athena - Querying over S3 buckets
Kinesis Firehose - Cloudwatch, Custom or S3 data into Data warehouse feeds, notifications
Lambda - Integrate into CRM, Lead history

Use lookups for different customer experience - DynamoDB
Amazon Translate - Translation
Polly - Text to speech in different languages

Compliance monitoring 
- Call recording (S3 + encyrpted - voice data lake)
- Voice file --> Transcribe (Text chats) --> Text data lake
- Find one piece of information - find point in time, disclaimer,.. etc;
- Get data insights on better products based on customer feedback
- Wordclouds

- Softphone ( Screen Pop)
- WordCloud ( https://wordcloudapi.com/ )

https://aws.amazon.com/solutionspace/contact-center/


# WebRTC (Salesforce)
https://inteygrate.com/salesforce-webrtc-integration/

Open CTI - https://help.salesforce.com/articleView?id=cloud_cti_api_overview.htm&type=5

https://www.salesforce.com/uk/products/einstein/overview/ - Einstein analytics


## Well architected - 5 principles

operational excellence, security, reliability, performance efficiency, and cost optimization

https://aws.amazon.com/architecture/well-architected/




# References

https://docs.aws.amazon.com/connect/latest/adminguide/what-is-amazon-connect.html (Admin Guide)




# Cloud security standards

NIST.SP.800-190  "Application Container Security Guide"
CIS_Docker_1.13.0_Benchmark_v1.0.0*
CIS_Amazon_Web_Services_Foundations_Benchmark*
CIS_Amazon_Web_Services_Three-tier_Web_Architecture_Benchmark
CIS_Docker_Community_Edition_Benchmark_v1.1.0*

