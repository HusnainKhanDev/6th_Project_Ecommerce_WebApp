from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Look for token in cookies instead of header
        token = request.COOKIES.get('Token')
        print("Token", token)

        if token is None:
            return None  # no token, unauthenticated request

        # Validate the token and return user
        validated_token = self.get_validated_token(token)
        # built-in method from JWTAuthentication
        # checks token is valid, not expired, not tampered

        user = self.get_user(validated_token)
        # built-in method from JWTAuthentication
        # extracts user_id from token payload
        # fetches User from DB where id=user_id


        return (user, validated_token)  # Django sets this as request.user ✓
        # Django receives this tuple
        # automatically sets first value as request.user ✓
        # this is Django's authentication contract —
        # whatever you return as first value becomes request.user