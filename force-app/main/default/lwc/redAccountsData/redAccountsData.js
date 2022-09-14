import { api, LightningElement, wire } from 'lwc';
import getRedAccounts from '@salesforce/apex/RedAccountsData.getRedAccounts';

export default class RedAccountsData extends LightningElement {
    @api maxRecords = 10;

    records = [];
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Last Activity', fieldName: 'LastActivityDate' },
    ]

    @wire(getRedAccounts, {maxRecords: '$maxRecords'})
    wired_GetRedAccounts({ data, errors }) {
        if (data) {
            this.records = data;
        } else if (errors) {
            this.records = [];
        }
    }
}
