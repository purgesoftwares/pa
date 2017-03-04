import { Routes } from '@angular/router';

import { LoginRoutes } from './login/index';
import { ProviderLoginRoutes } from './providerlogin/index';
import { SignupRoutes } from './signup/index';
import { ProviderSignupRoutes } from './providersignup/index';
import { PageRoutes } from './page/index';
import { DashboardRoutes } from './dashboard/index';
import { LoggedInGuard } from './logged-in.guard';
import { ProviderLoggedInGuard } from './provider-logged-in.guard';

import { PageComponent } from './page/index';
import { LoginComponent } from './login/index';
import { ProviderLoginComponent } from './providerlogin/index';

import { ForgotPasswordComponent } from './forgot-password/index';
import { ProviderForgotPasswordComponent } from './provider-forgot-password/index';

import { ResetPasswordComponent } from './reset-password/index';
import { ProviderResetPasswordComponent } from './provider-reset-password/index';

import { SignupComponent } from './signup/index';
import { ProviderSignupComponent } from './providersignup/index';
import { DashboardComponent } from './dashboard/index';
import { ProviderDashboardComponent } from './provider-dashboard/index';
import { CouponComponent } from './dashboard/coupons/index';
import { ProfileComponent } from './dashboard/profile/index';
import { ProviderProfileComponent } from './provider-dashboard/profile/index';
import { ProviderInfoComponent } from './provider-dashboard/provider-info/index';
import { CollectCouponComponent } from './provider-dashboard/collect-coupon/index';
import { CouponCollectedComponent } from './provider-dashboard/coupon-collected/index';
import { PaymentMethodComponent } from './provider-dashboard/payment-method/index';
import { HelpComponent } from './page/help/index';
import { HomeComponent } from './page/home/index';
import { DHomeComponent } from './dashboard/home/index';
import { ProviderHomeComponent } from './provider-dashboard/home/index';
import { AboutComponent } from './page/about/index';
import { PrivacyComponent } from './page/privacy/index';
import { LocationComponent } from './dashboard/location/index';
import { CouponViewComponent } from './dashboard/coupons/coupon-view/index';
import { OrderConfirmComponent } from './dashboard/coupons/order-confirm/index';
import { TermConditionComponent } from './dashboard/coupons/terms-conditions/index';
import { JoinFriendComponent } from './dashboard/coupons/join-friend/index';
import { PreviousCouponComponent } from './dashboard/previous-coupons/index';
import { CouponPackageViewComponent } from './dashboard/coupons/coupon-package-view/index';
import { CouponCartComponent } from './dashboard/coupons/coupon-cart/index';
import { CouponDetailsComponent } from './dashboard/coupons/coupon-details/index';
import { SendAnotherEmailComponent } from './dashboard/coupons/send-another-email/index';
import { ThankYouComponent } from './dashboard/coupons/thank-you/index';

export const routes: Routes = [
	
	{
        path: 'signup', 
        component: SignupComponent
    },
    {
    	path: 'provider-signup',	
    	component: ProviderSignupComponent
  	},
    {
      path: 'login',  
      component: LoginComponent
    },
     {
      path: 'provider-login',  
      component: ProviderLoginComponent
    },
    {
      path: 'forgot-password',  
      component: ForgotPasswordComponent
    },
    {
      path: 'provider-forgot-password',  
      component: ProviderForgotPasswordComponent
    },
  	{
        path: 'reset-password', 
        component: ResetPasswordComponent
    },
    {
    	path: 'provider-reset-password',	
    	component: ProviderResetPasswordComponent
  	},
	 {
    	path: '',	
    	component: PageComponent,
      children: [
            {
                path: '', 
                component: HomeComponent,
                   
            },
            {
                path: 'help', 
                component: HelpComponent,
                   
            },
            {
                path: 'about', 
                component: AboutComponent,
                   
            },
            {
                path: 'privacy', 
                component: PrivacyComponent,
                   
            }
      ]
  	},
    {
      path: 'dashboard', 
      component: DashboardComponent,
      canActivate: [LoggedInGuard],
      children: [
        {
            path: '', 
            component: DHomeComponent,
               
        },
      	{
      			path: 'profile', 
      			component: ProfileComponent,
               
    		},
        {
            path: 'location', 
            component: LocationComponent,
               
        },
	    	{
      			path: 'coupon', 
      			component: CouponComponent
               
    		},
        {
            path: 'coupon-package-view',
            component: CouponPackageViewComponent
        },
        {
            path: 'coupon-cart',
            component: CouponCartComponent
        },
        {
            path: 'coupon-details',
            component: CouponDetailsComponent
        },
        {
            path: 'order-confirm', 
            component: OrderConfirmComponent,
               
        },
        {
            path: 'send-another-email', 
            component: SendAnotherEmailComponent,
               
        },
        {
            path: 'thank-you', 
            component: ThankYouComponent,
               
        },
        {
            path: 'coupon-view', 
            component: CouponViewComponent,
        },
        {
            path: 'terms-conditions', 
            component: TermConditionComponent,
        },
        {
            path: 'join-friend', 
            component: JoinFriendComponent,
        },
        {
            path: 'previous-coupons', 
            component: PreviousCouponComponent,
        }
    	]
    },
    {
      path: 'provider-dashboard', 
      component: ProviderDashboardComponent,
      canActivate: [ProviderLoggedInGuard],
      children: [
        {
            path: '', 
            component: ProviderHomeComponent,
               
        },
        {
            path: 'profile', 
            component: ProviderProfileComponent,
               
        },
        {
            path: 'provider-info', 
            component: ProviderInfoComponent,
               
        },
        {
            path: 'payment-method', 
            component: PaymentMethodComponent,
               
        },
        {
          path: 'collect-coupon',
          component: CollectCouponComponent,
        },
        {
          path: 'coupon-collected',
          component: CouponCollectedComponent,
        }
      ]
    }
];
