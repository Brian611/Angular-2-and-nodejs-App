import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { IContact } from '../../classes/icontact';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: IContact[];
  contactForm: FormGroup;

  constructor(private contServ: ContactsService, public fb: FormBuilder, private router: Router) {
    this.contactForm = fb.group({
      name: ['brian', Validators.required],
      surname: ['pooe', Validators.required],
      cellNo: ['0786452611', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllContacts()
  }

  getAllContacts() {
    return this.contServ.getAllContacts()
      .subscribe(contact => {
        this.contacts = contact;
      },
      error => console.log());
  }

  addContact($event) {
    $event.preventDefault();
    //console.log(this.contactForm.value);
    this.contServ.addContact(this.contactForm.value)
      .subscribe(contact => {
        this.getAllContacts();
      },
      error => (console.log(error)),
      () => this.contactForm.reset());
  }
  editContact(id) {
    this.contServ.getContactById(id)
      .subscribe(contact => {
        if (contact.success) {
          let contactData: NavigationExtras = {
            queryParams: {
              "_id": contact.contact._id,
              "name": contact.contact.name,
              "surname": contact.contact.surname,
              "cellNo": contact.contact.cellNo
            }
          }
          this.router.navigate(['/editContact'], contactData);
          return false;
        }
      },
      error => console.log(error));

  }

  deleteContact(id) {
    console.log(id);
  }
}
