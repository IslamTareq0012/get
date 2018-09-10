import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserHomePage } from '../pages/user-home/user-home';
import { ProfilePage } from '../pages/profile/profile';
import { InviteFriendsPage } from '../pages/invite-friends/invite-friends';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { BoutUsPage } from '../pages/bout-us/bout-us';
import { NotificationPage } from '../pages/notification/notification';
import { MyRequestsPage } from '../pages/my-requests/my-requests';

import { ProfileProvider } from '../providers/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  userName = null;
  userImage = null;
  imgbasurl: any = "http://54.163.41.235:1337";

  pages: Array<{ title: string, component: any }>;

  constructor(private events: Events, private profileProvider: ProfileProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {


    this.events.subscribe('RESPONSE:ERROR', (error: any) => {
      this.profileProvider.details().subscribe(
        response => {
          console.log(response);
          this.userName = response.user.fullName;
          this.userImage = response.user.image;
          console.log("current user :", response);
        });
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
    this.pages = [
      { title: 'Home', component: UserHomePage },
      { title: 'My Items', component: ProfilePage },
      { title: 'My Requests', component: MyRequestsPage },
      { title: 'Invite Friends', component: InviteFriendsPage },
      { title: 'Notifications', component: NotificationPage },
      { title: 'Contact Us', component: ContactUsPage },
      { title: 'Privacy Policy', component: PrivacyPolicyPage },
      { title: 'About Us', component: BoutUsPage }

    ];
  }
  openPage(page) {
    this.nav.setRoot(page.component);

  }
  logoutNav() {
    this.nav.setRoot(HomePage);
  }
}

