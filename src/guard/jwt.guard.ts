import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  private allowedRoutes = ['/api/guests/:id', '/api/auth/login']
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { path } = context.switchToHttp().getRequest()

    const isPublic = this.allowedRoutes.some((allowedPath) => this.matchPath(allowedPath, path))

    if (isPublic) {
      return true // Allow access without requiring authentication
    }
    return super.canActivate(context) // Delegate to the passport strategy
  }

  // Function to check if the requested path matches a pattern (supports :id)
  private matchPath(allowedPath: string, requestPath: string): boolean {
    const pathRegex = new RegExp(
      allowedPath.replace(/:[^\s/]+/g, '([\\w-]+)'), // Replace :id or other route params with regex
    )
    return pathRegex.test(requestPath)
  }
}
