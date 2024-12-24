import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  getPermissions(pageKey: string): any {
    const userPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const addPermission = userPermissions.some((permission: any) =>
      pageKey.includes(permission.pageKey) &&
      permission.permissionActions?.some(action => action.permissionAction === 'اضافه' && action.havePermission)
    );
    console.log('addPermission', addPermission);
    const editPermission = userPermissions.some((permission: any) =>
      pageKey.includes(permission.pageKey) &&
      permission.permissionActions?.some(action => action.permissionAction === 'تعديل' && action.havePermission)
    );
    const deletePermission = userPermissions.some((permission: any) =>
      pageKey.includes(permission.pageKey) &&
      permission.permissionActions?.some(action => action.permissionAction === 'حذف' && action.havePermission)
    );
    return { addPermission, editPermission, deletePermission };
  }

}
