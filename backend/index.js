import express from 'express';
import { createObjectCsvStringifier } from 'csv-writer';

const app = express();
app.get('/download-csv', (req, res) => {
    // Create a CSV stringifier
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'name', title: 'Name' },
            { id: 'age', title: 'Age' },
            { id: 'country', title: 'Country' }
        ]
    });

    // Data to be written into the CSV file
    const data = [
        { name: 'Alice', age: 25, country: 'USA' },
        { name: 'Bob', age: 30, country: 'Canada' },
        { name: 'Charlie', age: 28, country: 'UK' }
    ];

    // Write CSV header and data rows
    const csvContent = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    // Set headers to indicate file download
    res.header('Content-Type', 'text/csv');
    res.attachment('sample.csv');

    // Send the CSV content as response
    res.send(csvContent);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
