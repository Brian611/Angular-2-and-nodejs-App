import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IContact } from '../classes/icontact';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactsService {
    headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) { }

    getAllContacts(): Observable<IContact[]> {
        return this.http.get('http://localhost:3000/api/contacts')
            .map((resp: Response) => <IContact[]>resp.json())
            .catch(this.handleErrors);
    }

    addContact(contact) {

        return this.http.post('http://localhost:3000/api/contact', contact, { headers: this.headers })
            .map((resp: Response) => <IContact>resp.json())
            .catch(this.handleErrors);
    }

    getContactById(id) {
        return this.http.get('http://localhost:3000/api/contact/' + id)
            .map((resp: Response) => resp.json())
            .catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        let msg = `Status Code : ${error.status} - Error : ${error.json().msg.errmsg} `;
        return Observable.throw(msg);
    }
}
