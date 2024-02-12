$(document).ready(function() {
    var columns = [
        { dataField: 'id', caption: 'Id',allowEditing: false },
        { dataField: 'companyName', caption: 'Company Name',allowEditing: false},
        { dataField: 'industry', caption: 'Industry' },
        { dataField: 'primaryContact', caption: 'Primary Contact',allowEditing: false },
        { dataField: 'addressLine1', caption: 'Address Line 1' ,allowEditing: false},
        { dataField: 'addressLine2', caption: 'Address Line 2',allowEditing: false },
        { dataField: 'addressState', caption: 'Address State',allowEditing: false },
        { dataField: 'addressCity', caption: 'Address City',allowEditing: false },
        { dataField: 'addressCountry', caption: 'Address Country',allowEditing: false },
        { dataField: 'annualRevenue', caption: 'Annual Revenue' ,format: {
            type: 'currency',
            precision: 2
        }  },
        { dataField: 'dateAdded', caption: 'Date Added' },
        {
            type: 'buttons',
            buttons: [{
              text: 'View Details',
              onClick: function(e) {
                var id = e.row.data.id;
                localStorage.setItem('currentRowId', id.toString());
                window.location.href = 'View_Details.html'; 
               }
            }]
        }
        
    ];

    var dataGrid = $('#gridContainer').dxDataGrid({
        dataSource: {
            load: function() {
                return fetchData('https://localhost:7198/api/Company');
            }
        },
        columns: columns,
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnAutoWidth: true,
        showBorders: true,
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: 'Search...'
        },
        onRowUpdated: function(e) {
            var updatedData = e.data;
            saveChanges(updatedData);
        },
        onCellPrepared: function(e) {
            if (e.column.allowEditing) {
                $(e.cellElement).addClass("editable-cell");
            }
        }
    }).dxDataGrid('instance');

    function saveChanges(companyData) {
        console.log('Changes saved for company:', companyData);
        console.log(companyData);
    }

    
    $('#addNewCompanyBtn').dxButton({
        text: 'Add New Company',
        stylingMode: 'outlined',
        type: 'success',
        onClick: function() {
            window.location.href = 'Add_Company.html';
        }
    });

    function fetchData(url) {
        return $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        });
    }
});
