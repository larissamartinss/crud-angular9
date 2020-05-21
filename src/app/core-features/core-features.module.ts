import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// import features modules in this module that you require to style your app or to increase its functionality
// you can also add directives and pipes that your require throughout your app in this module and export them from here
//this is the default file for including the material modules such as MatSnackBarModule, MatDialogModule
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ ],
  exports:[
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents:[ ]
})
export class CoreFeaturesModule {
  static forRoot(): ModuleWithProviders{
    return{
      ngModule:CoreFeaturesModule,
      providers: [ ]
    };
  }
  static forChild(): ModuleWithProviders{
    return{
      ngModule:CoreFeaturesModule,
      providers:[ ]
    };
  }
}