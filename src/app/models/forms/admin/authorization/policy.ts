export let policyModel:any = {
    "fields": [
        {
            "label": "Name",
            "id": "name",
            "type": "text",
            "inputType": "text",
            "placeholder": "Policy Name",
            "value": "",
            "shown": true,
            "editable": false
        },
        {
            "label": "Description",
            "id": "description",
            "type": "area",
            "inputType": "area",
            "placeholder": "Policy Description",
            "value": "",
            "shown": true,
            "editable": true
        },
        {
            "label": "Policy",
            "id": "policy",
            "type": "json",
            "inputType": "json",
            "placeholder": "Policy Statements",
            "value": {
                "version": "v1",
                "statements": [
                  {
                    "effect": "allow",
                    "actions": ["IAM:Policy:createPolicy"],
                    "resources": ["*"],
                    "customers": ["*"],
                  }
                ]
              },
            "shown": false,
            "editable": true
        },
    ]
};