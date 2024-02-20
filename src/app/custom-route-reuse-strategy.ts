import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  private routesToDisableReuse: string[] = ['project/:shorttitle'];

  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const disableReuse =
      this.routesToDisableReuse.includes(curr.routeConfig?.path || '') ||
      this.routesToDisableReuse.includes(future.routeConfig?.path || '');
    
    if (disableReuse === true) {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}