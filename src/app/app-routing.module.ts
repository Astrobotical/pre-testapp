import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path:'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  }
  ,
  {
    path : '',
    redirectTo : 'onboarding',
    pathMatch : 'full'   
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./landingpage/landingpage.module').then( m => m.LandingpagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
