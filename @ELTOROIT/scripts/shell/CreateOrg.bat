sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername --setalias soLWC_HOW -d 1
sfdx force:org:open --path=/lightning/setup/DeployStatus/home
sfdx force:source:push --forceoverwrite --json
sfdx force:source:push -u soLWC_HOW -f --json
sfdx force:user:password:generate --json
sfdx force:user:display --json
sfdx force:apex:execute -f .\scripts\apex\resetData.apex --json