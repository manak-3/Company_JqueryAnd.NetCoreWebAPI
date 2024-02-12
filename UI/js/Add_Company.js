$(document).ready(function() {
    var industryOptions = ['Manufacturing', 'Marketing', 'Finance', 'Health'];
    var companyFormItems = [
        {
            dataField: 'companyName',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Company Name'
            }
        },
        {
            dataField: 'industry',
            editorType: 'dxSelectBox',
            editorOptions: {
                placeholder: 'Industry',
                dataSource: industryOptions 
            }
        },
        {
            dataField: 'primaryContact',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Primary Contact'
            }
        },
        {
            dataField: 'addressLine1',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Address Line 1'
            }
        },
        {
            dataField: 'addressLine2',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Address Line 2'
            }
        },
        {
            dataField: 'addressState',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Address State'
            }
        },
        {
            dataField: 'addressCity',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Address City'
            }
        },
        {
            dataField: 'addressCountry',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Address Country'
            }
        },
        {
            dataField: 'annualRevenue',
            editorType: 'dxTextBox',
            editorOptions: {
                placeholder: 'Annual Revenue',
                onValueChanged: function(e) {
                    if (e.value && !e.value.startsWith("$")) {
                        e.component.option("value", "$" + e.value);
                    }
                }
            }
        },
        {
            itemType: 'button',
            horizontalAlignment: 'left',
            buttonOptions: {
                text: 'Add Company',
                stylingMode: 'outlined',
                type: 'success',
                onClick: function() {
                    var formData = $('#companyFormContainer').dxForm('instance').option('formData');
                    var postData = {
                        companyName: formData.companyName,
                        industry:formData.industry,
                        primaryContact:formData.primaryContact,
                        addressLine1:formData.addressLine1,
                        addressLine2:formData.addressLine2,
                        addressState:formData.addressState,
                        addressCity:formData.addressCity,
                        addressCountry:formData.addressCountry,
                        annualRevenue:formData.annualRevenue.startsWith("$") ? formData.annualRevenue.slice(1) : formData.annualRevenue
                    };
                    AddData('https://localhost:7198/api/Company', postData)
                        .done(function(response) {
                            console.log('Company added successfully:', response);
                            window.location.href = 'Companies.html';
                        })
                        .fail(function(xhr, status, error) {
                            console.error('Error adding company:', error);
                        });
                }
            }
        },
        {
            itemType: 'button',
            horizontalAlignment: 'left',
            buttonOptions: {
                text: 'Go Back',
                stylingMode: 'outlined',
                type: 'normal',
                onClick: function() {
                    window.location.href = 'Companies.html';
                }
            }
        }
        
    ];

    $('#companyFormContainer').dxForm({
        formData: {},
        labelLocation: 'top',
        items: companyFormItems
    });

    function AddData(url, data) {
        return $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json'
        });
    }
});
