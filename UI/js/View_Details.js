$(document).ready(function() {
    var industries = ["Manufacturing", "Marketing", "Finance", "Health"];
    var currentId = parseInt(localStorage.getItem('currentRowId')); 
    var dataGrid = $("#data-grid").dxDataGrid({
        dataSource: {
            load: function() {
                return fetchData('https://localhost:7198/api/Company/'+currentId);
            }
        },
        columns: [
            { dataField: 'id', caption: 'Id', allowEditing: false },
            { dataField: 'companyName', caption: 'Company Name' },
            { dataField: 'industry', caption: 'Industry' ,lookup: { dataSource: industries } },
            { dataField: 'primaryContact', caption: 'Primary Contact' },
            { dataField: 'addressLine1', caption: 'Address Line 1' },
            { dataField: 'addressLine2', caption: 'Address Line 2' },
            { dataField: 'addressState', caption: 'Address State' },
            { dataField: 'addressCity', caption: 'Address City' },
            { dataField: 'addressCountry', caption: 'Address Country' },
            { dataField: 'annualRevenue', caption: 'Annual Revenue' , format: {
                type: 'currency',
                precision: 2
            } },
            { dataField: 'dateAdded', caption: 'Date Added', allowEditing: false },
            {
                type: 'buttons',
                buttons: ['edit',{
                    text: 'Save',
                    onClick: function(e) {
                        var data = e.row.data;
                        var postData = {
                            companyName: data.companyName,
                            industry:data.industry,
                            primaryContact:data.primaryContact,
                            addressLine1:data.addressLine1,
                            addressLine2:data.addressLine2,
                            addressState:data.addressState,
                            addressCity:data.addressCity,
                            addressCountry:data.addressCountry,
                            annualRevenue:data.annualRevenue
                        };
                        saveData('https://localhost:7198/api/Company/'+data.id, postData)
                            .done(function(response) {
                                console.log('Changes saved for:', data.companyName);
                                window.location.href = 'Companies.html';
                            })
                            .fail(function(xhr, status, error) {
                                console.error('Error saving changes:', error);
                            });
                    }
                }, {
                    text: 'Delete',
                    onClick: function(e) {
                        var data = e.row.data;
                        if (confirm("Are you sure you want to delete " + data.companyName + "?")) {
                            deleteData('https://localhost:7198/api/Company/'+data.id)
                                .done(function(response) {
                                    console.log('Company deleted with ID:', data.id);
                                    window.location.href = 'Companies.html';
                                })
                                .fail(function(xhr, status, error) {
                                    console.error('Error deleting company:', error);
                                });
                        }
                    }
                }],
            }
            
        ],
        editing: {
            mode: "cell",
            allowUpdating: true,
            allowDeleting: false,
            allowAdding: false
        },
        onSelectionChanged: function(data) {
            var selectedItem = dataGrid.getSelectedRowsData()[0];
            form.option("formData", selectedItem);
        }
    }).dxDataGrid("instance");

    var form = $("#form").dxForm({
        formData: {},
        readOnly: true
    }).dxForm("instance");

    function saveData(url, data) {
        return $.ajax({
            url: url,
            method: 'PUT',
            data: data,
            dataType: 'json'
        });
    }
    
    function deleteData(url) {
        return $.ajax({
            url: url,
            method: 'DELETE',
            dataType: 'json'
        });
    }

    function fetchData(url) {
        return $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        });
    }

    var backButton = $("#buttons").dxButton({
        text: "Back",
        onClick: function() {
            window.location.href = 'Companies.html';
        }
    }).dxButton("instance");
});

