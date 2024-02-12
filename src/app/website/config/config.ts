export let mainRoutes: any[] = [
    {
        "name": "Monitoring",
        "url": "app/monitoring",
        "icon": "bx bx-tachometer",
        "children": [
            {
                "name": "Templates",
                "url": "app/monitoring/templates",
                "icon": "bx bx-loader-circle",
                "children": [
                    {
                        "name": "Cloud Alarms",
                        "url": "app/monitoring/templates/alarms",
                        "icon": "bx bx-loader-circle",
                        "children": []
                    },
                    {
                        "name": "Cloud Notifications",
                        "url": "app/monitoring/templates/notifications",
                        "icon": "bx bx-loader-circle",
                        "children": []
                    },
                ]
            },
            
            {
                "name": "Statistics",
                "url": "app/monitoring/statistics",
                "icon": "bx bx-loader-circle",
                "children": []
            }
        ]
    },
    {
        "name": "Assets",
        "url": "app/assets",
        "icon": "bx bx-server",
        "children": [
            {
                "name": "Products",
                "url": "app/assets/products",
                "icon": "bx bx-loader-circle",
                "children": []
            },
            {
                "name": "Usage",
                "url": "app/assets/usage",
                "icon": "bx bx-loader-circle",
                "children": []
            },
            {
                "name": "Resources",
                "url": "app/assets/resources",
                "icon": "bx bx-loader-circle",
                "children": []
            },
        ]
    },


]



export let adminRoutes: any[] = [
    {
        "name": "IAM",
        "url": "/admin/authorization",
        "icon": "bx bxs-user-account",
        "children": [{
            "name": "Users",
            "url": "/admin/authorization/users",
            "icon": "bx bxs-user",
            "children": []

        },
        {
            "name": "Groups",
            "url": "/admin/authorization/groups",
            "icon": "bx bxs-group",
            "children": []

        },
        {
            "name": "Policies",
            "url": "/admin/authorization/policies",
            "icon": "bx bx-loader-circle",
            "children": []

        },
        {
            "name": "API Keys",
            "url": "/admin/authorization/api_keys",
            "icon": "bx bxs-key",
            "children": []

        }
        ]        
    }
]


export let customers = [
    'ALL',
    'Jarir',
    'Al Dawaa',
]
