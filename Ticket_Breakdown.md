# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
To get the custom ids of the user I would keep all the mapping of agent and their corresponding facilities custom id with the following format
1. Facility_ID
2. Custom_Agent_ID
3. Internal_Agent_ID

The custom ID will be initially populated with the same ID as the internal ID. If the facility would like to update the agent with certain ID they will be provided with the option to update the Agent ID which will be used to update the Custom_agent_id which will be used further by the facility. However, the internal tracking will be done by the existing agent. We also need to check before updating with new custom_agent_id is that it need to be unique and no mapping of this custom_agent_id is already present for a given facilitie and internal agent id
Note: this is done on the assumption that many facilities can call a particular agent and vice-versa
Division of tasks into multiple tickets:
1. Verify the code base to check the dependency on Internal_Agent_Id column and also make sure all the impacted functions due to the change (2-3 story points)
2. Create a new mapping table named Map_Facility_Agent table in the database with the above schema by default custom_agent_id will be the internal_agent_id (2-3 story points)
3.  Provide an option to update the custom id for each agent for the existing agents (2-3 story points)
4.  Update the getShiftsByFacility function to use custom_agent_id and validate the changes (2-3 story points)
5.  Similarly update generateReport in the similar fashion as the PDF would need the new custom ids instead (2-3 story points)
