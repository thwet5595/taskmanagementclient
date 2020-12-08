import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CurrentUserService } from './current-user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class NeedAuthGuard implements CanActivate {

    constructor(private currentUser: CurrentUserService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const redirectUrl = route['_routerState']['url'];

        if (this.currentUser.isLogged()) {
            return true;
        }

        this.router.navigateByUrl(
            this.router.createUrlTree(
                ['/login'], {
                    queryParams: {
                        redirectUrl
                        // returnUrl: state.url
                    }
                }
            )
        );

        this.currentUser.clearSession();
        return false;
    }
}
