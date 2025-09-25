const stitchingData= [
        {
            "id": "684040b745f76b8ae5035bb4",
            "name": "Blouse Stitching",
            "stitchingOption": [
                {
                    "id": "684040b745f76b8ae5035bb1",
                    "name": "Unstitch",
                    "catalogue_price": 0,
                    "price": 0,
                    "type": "Redio",
                    "dispatch_time": "Same day dispatch",
                    "isActive": true,
                    "isCustom": false,
                    "isDefault": true,
                    "stitchingValues": []
                },
                {
                    "id": "684040b745f76b8ae5035bb2",
                    "name": "Standard Stitching",
                    "catalogue_price": 350,
                    "price": 400,
                    "type": "Redio",
                    "dispatch_time": "4-5 Days dispatch",
                    "isActive": true,
                    "isCustom": false,
                    "isDefault": true,
                    "stitchingValues": [
                        {
                            "id": "6841299445f76b8ae5035c37",
                            "type": "Dropdown",
                            "name": "Waist Size",
                            "range": "",
                            "values": "26,28,30,32,34,36,38,40,42,44"
                        },
                        {
                            "id": "684129c045f76b8ae5035c38",
                            "type": "Dropdown",
                            "name": "Length",
                            "range": "",
                            "values": "35,37,39,41,43"
                        }
                    ]
                },
                {
                    "id": "684040b745f76b8ae5035bb3",
                    "name": "Custome Stitching",
                    "catalogue_price": 700,
                    "price": 800,
                    "type": "Redio",
                    "dispatch_time": "8-9 Days dispatch",
                    "isActive": true,
                    "isCustom": true,
                    "isDefault": true,
                    "stitchingValues": [
                        {
                            "id": "68412a1645f76b8ae5035c39",
                            "type": "TextField",
                            "name": "Around Bust",
                            "range": "32-42",
                            "values": ""
                        },
                        {
                            "id": "68412a4b45f76b8ae5035c3b",
                            "type": "TextField",
                            "name": "Blouse Length",
                            "range": "11-18",
                            "values": ""
                        },
                        {
                            "id": "68412a3545f76b8ae5035c3a",
                            "type": "TextField",
                            "name": "Around Above Waist",
                            "range": "22-26",
                            "values": ""
                        }
                    ]
                }
            ]
        },
        {
            "id": "68a96dcbd2ddcae76bf87483",
            "name": "Other Essential",
            "stitchingOption": [
                {
                    "id": "68a96dcbd2ddcae76bf87481",
                    "name": "Petticoat",
                    "catalogue_price": 300,
                    "price": 400,
                    "type": "CheckBox",
                    "dispatch_time": "5 to 10 Woking Days",
                    "isActive": true,
                    "isCustom": false,
                    "isDefault": true,
                    "stitchingValues": []
                },
                {
                    "id": "68a96dcbd2ddcae76bf87482",
                    "name": "Fall & Edging",
                    "catalogue_price": 400,
                    "price": 500,
                    "type": "CheckBox",
                    "dispatch_time": "5 to 10 Woking Days",
                    "isActive": true,
                    "isCustom": false,
                    "isDefault": true,
                    "stitchingValues": []
                }
            ]
        }
    ]

    export default stitchingData