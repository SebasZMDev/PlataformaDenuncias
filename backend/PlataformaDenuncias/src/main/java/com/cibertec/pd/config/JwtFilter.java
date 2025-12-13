package com.cibertec.pd.config;

import com.cibertec.pd.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.startsWith("/api/auth") || path.startsWith("/api/denuncias/public")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        String token = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        } else {

            if (request.getCookies() != null) {
                for (Cookie c : request.getCookies()) {
                    if ("token".equals(c.getName())) {
                        token = c.getValue();
                        break;
                    }
                }
            }
        }



        if (token == null || token.trim().isEmpty()) {
            System.out.println(">> TOKEN ES NULL O VACÍO - REQUEST SIN AUTH");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String username = jwtUtils.extractUsername(token);

            if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

                var userDetails = authService.loadUserByUsername(username);

                if (jwtUtils.validateToken(token)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

        } catch (Exception e) {
            System.out.println("❌ ERROR PARSEANDO TOKEN:");
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

}
