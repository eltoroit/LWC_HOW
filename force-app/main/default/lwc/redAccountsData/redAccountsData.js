import { api, LightningElement, wire } from 'lwc';
import getRedAccounts from '@salesforce/apex/RedAccountsData.getRedAccounts';

export default class RedAccountsData extends LightningElement {
    @api maxRecords = 10;

    records = [];
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Last Activity', fieldName: 'LastActivityDate' },
        { label: 'Contact Name', fieldName: 'ContactName' },
        { label: 'Email', fieldName: 'Email', type: "email" },
        { label: 'Phone', fieldName: 'Phone', type: "phone" },
    ]

    @wire(getRedAccounts, {maxRecords: '$maxRecords'})
    wired_GetRedAccounts({ data, errors }) {
        if (data) {
            this.records = data.map(account => {
                let newAccount = {
                    Id: account.Id,
                    Name: account.Name,
                    LastActivityDate: account.LastActivityDate,
                    _children : []
                }
                if (account.Contacts?.length > 0) {
                    newAccount._children = account.Contacts.map(contact => {
                        let newContact = {
                            Id: contact.Id,
                            ContactName: contact.Name,
                            Email: contact.Email,
                            Phone: contact.Phone
                        }
                        return newContact;
                    })
                }
                return newAccount;
            });
        } else if (errors) {
            this.records = [];
        }
    }
}