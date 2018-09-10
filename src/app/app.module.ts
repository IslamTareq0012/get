import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import {ImagePicker} from '@ionic-native/image-picker';
import { HttpModule } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {VerificationPage} from '../pages/verification/verification';
import {UserHomePage} from '../pages/user-home/user-home';
import {CategoriesPage} from '../pages/categories/categories';
import {PrimaryAddressPage} from '../pages/primary-address/primary-address';
import {ThankyouPage} from '../pages/thank-you/thank-you';
import {ProfilePage} from '../pages/profile/profile';
import {AddItemPage} from '../pages/add-item/add-item';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {IntroPage} from '../pages/intro/intro';
import {EditAdditionAddressPage} from '../pages/edit-addition-address/edit-addition-address';
import {AddAdditionalAddressPage} from '../pages/add-additional-address/add-additional-address';
import {InviteFriendsPage} from '../pages/invite-friends/invite-friends';
import {PrivacyPolicyPage} from '../pages/privacy-policy/privacy-policy';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {BoutUsPage} from '../pages/bout-us/bout-us';
import {NotificationPage} from '../pages/notification/notification';
import {MyRequestsPage} from '../pages/my-requests/my-requests';
import {EditItemPage} from '../pages/edit-item/edit-item';
import {ItemOwnerPage} from '../pages/item-owner/item-owner';

import {DatePipe} from '../pipes/date/date';
import {ShortDatePipe} from '../pipes/short-date/short-date';

import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ForgetPasswordProvider } from '../providers/forget-password/forget-password';
import { VerifyProvider } from '../providers/verfy/verfy';
import { CategoryProvider } from '../providers/category/category';
import { PrimaryAddressProvider } from '../providers/primary-address/primary-address';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { ProfileProvider } from '../providers/profile/profile';
import { ListitemsProvider } from '../providers/list-items/list-items';
import { ViewItemProvider } from '../providers/view-item/view-item';
import { AdditemProvider } from '../providers/add-item/add-item';
import { TransactionProvider } from '../providers/transaction/transaction';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VerificationPage,
    UserHomePage,
    CategoriesPage,
    PrimaryAddressPage,
    ThankyouPage,
    ProfilePage,
    AddItemPage,
    ItemDetailsPage,
    IntroPage,
    EditAdditionAddressPage,
    AddAdditionalAddressPage,
    InviteFriendsPage,
    PrivacyPolicyPage,
    ContactUsPage,
    BoutUsPage,
    NotificationPage,
    DatePipe,
    ShortDatePipe,
    MyRequestsPage,
    EditItemPage,
    ItemOwnerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQDwDtkYyYrhympS3EvBAliy7NZbhfIac'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VerificationPage,
    UserHomePage,
    CategoriesPage,
    PrimaryAddressPage,
    ThankyouPage,
    ProfilePage,
    AddItemPage,
    IntroPage,
    EditAdditionAddressPage,
    AddAdditionalAddressPage,
    ItemDetailsPage,
    InviteFriendsPage,
    PrivacyPolicyPage,
    ContactUsPage,
    BoutUsPage,
    NotificationPage,
    MyRequestsPage,
    EditItemPage,
    ItemOwnerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    ForgetPasswordProvider,
    CategoriesPage,
    VerifyProvider,
    CategoryProvider,
    PrimaryAddressProvider,
    GeolocationProvider,
    Geolocation,
    ImagePicker,
    ProfileProvider,
    ListitemsProvider,
    ViewItemProvider,
    AdditemProvider,
    EmailComposer,
    SocialSharing,
    TransactionProvider
  ]
})
export class AppModule {}
