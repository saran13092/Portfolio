import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  responseMessage: any;
  key = environment.emailJSKey;
  serviceId = environment.mailService;
  templateId = environment.templateId;


  contactForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    emailjs.init(this.key);
    this.contactForm = this.fb.group({
      name: [null, [Validators.pattern(Globalconstant.nameRegex)]],
      email: [null, [Validators.pattern(Globalconstant.emailRegex)]],
      subject: [null, [Validators.minLength(10)]],
      message: [null, [Validators.minLength(20)]],
    });
  }




  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      emailjs.send(this.serviceId, this.templateId, templateParams, this.key)
        .then(response => {
          this.snackbar.openSnackBar('Email sent successfully!', 'Close');
          console.log('Email sent successfully!', response.status, response.text);
          this.contactForm.reset();
          // Optionally, display a success message
          this.snackbar.open('Email sent successfully!', 'Close', { duration: 3000 });
          // Redirect to the home page
          // Navigate to the home page after the snackbar duration
          setTimeout(() => {
            this.router.navigate(['']);
          }, 3000); // Match the duration of the snackbar
        })
        .catch(error => {
          this.snackbar.openSnackBar('Failed to send email. Please try again.', 'Close');
           this.snackbar.openSnackBar('Email sent successfully!', 'Close');

          // Navigate to the home page after the snackbar duration
          setTimeout(() => {  
            this.router.navigate(['']);
          }, 3000); // Match the duration of the snackbar
          console.error('Error sending email:', error);
        });
    } else {
      this.snackbar.openSnackBar('Please fill out the form correctly.', 'Close');
    }
  }

  USER_ID(serviceId: string, templateId: string, templateParams: { name: any; email: any; subject: any; message: any; }, USER_ID: any) {
    throw new Error('Method not implemented.');
  }
}
