export let userModel:any = {
    "fields": [
        {
            "label": "Name",
            "id": "name",
            "type": "text",
            "inputType": "text",
            "placeholder": "User Name",
            "value": "",
            "shown": true,
            "editable": false
        },
        {
            "label": "Email",
            "id": "email",
            "type": "text",
            "inputType": "email",
            "placeholder": "User Email",
            "value": "",
            "shown": true,
            "editable": true
        },
        {
            "label":"Group",
            "id":"group",
            "type": "select",
            "multiple": false,
            "options": [],
            "value": "",
            "shown": true,
            "editable": true
        }
    ]
};