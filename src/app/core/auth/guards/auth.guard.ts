import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceDeprecated } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const authService = inject(AuthServiceDeprecated);

    // Check the authentication status
    return authService.check().pipe(
        switchMap((authenticated) => {
            // If the user is not authenticated
            if (!authenticated) {
                // console.log('User is not authenticated');
                const urlTree = router.parseUrl('/Sign-In');
                return of(urlTree); // Redirect to Sign-In
            } 

            // Get the required page key for this route
            const pageKey = route.data['pageKey'] as string[] | undefined;
            const userPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
            // console.log('User permissions:', userPermissions);
            // console.log('Required page key:', pageKey);

            // If no page key is provided, allow access (default behavior)
            if (!pageKey) {
                console.log('User is not authenticated');
                const urlTree = router.parseUrl('/Sign-In');
                return of(urlTree); // Redirect to Sign-In
            }

            if(pageKey[0] == 'welcome-page'){
                return of(true);
            }

            if(pageKey[0] == 'Profile'){
                return of(true);
            }

            // Check if user has permission for the required page key
            const hasPermission = userPermissions.some((permission: any) =>
                pageKey.includes(permission.pageKey) &&
                permission.permissionActions?.some(action => action.permissionAction === 'تصفح' && action.havePermission)
            );

            // Log permission result
            // console.log('Has permission:', hasPermission);

            // If user does not have permission, redirect to home
            if (!hasPermission) {
                console.log('HERE');
                
                // console.log('User lacks required permission, redirecting to home');
                const urlTree = router.parseUrl('/home');
                return of(urlTree);
            }

            // If everything is okay, allow access
            // console.log('User is authenticated and has permission, allowing access');
            return of(true);
        })
    );
};
