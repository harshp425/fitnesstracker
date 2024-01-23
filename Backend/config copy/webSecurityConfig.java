package com.project.fittapp.config;

import com.project.fittapp.service.customUserDetailService;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class webSecurityConfig implements WebMvcConfigurer{

    @Autowired
    private DataSource dataSource;

    @Bean
    public UserDetailsService userDetailsService(){
        return new customUserDetailService();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //This configuration ensures that Spring Security is properly set up to handle user authentication
    //using the custom database and custom user service
    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider authenProvider = new DaoAuthenticationProvider();
        authenProvider.setUserDetailsService(userDetailsService());
        authenProvider.setPasswordEncoder(passwordEncoder());

        ProviderManager providerManager = new ProviderManager(authenProvider);
        providerManager.setEraseCredentialsAfterAuthentication(false);

        return providerManager;
    }

    //This bean ensures that csrf tokens are disables because they have not been implemented in the
    //frontend transaction. It also ensures that Spring Security permits all HTTP requests from the
    //frontend to the specified endpoints.
    @Bean
    SecurityFilterChain springFilterChain(HttpSecurity http) throws Exception{

        http
                .csrf((csrf) -> csrf.disable())
                /*.csrf((csrf) -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))*/
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/registration/add").permitAll()
                        .requestMatchers("/registration/getAll").permitAll()
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/test/testing").permitAll()
                        .requestMatchers("/strength_entry/add").permitAll()
                        .requestMatchers("/endurance_entry/add").permitAll()
                        .requestMatchers("/strength_entry/getentry").permitAll()
                        .requestMatchers("/endurance_entry/getentry").permitAll()
                        .requestMatchers("/personalrecord/add").permitAll()
                        .requestMatchers("/personalrecord/getrecords").permitAll()
                        .requestMatchers("/personalrecord/removepr").permitAll()
                        .requestMatchers("/goals/removegoal").permitAll()
                        .requestMatchers("/goals/add").permitAll()
                        .requestMatchers("/goals/getgoals").permitAll()
                        .requestMatchers(HttpMethod.GET, "/csrftoken").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/registration/add") // Or specify a more specific path
                .allowedOrigins("http://localhost:3000") // Replace with your client's URL
                .allowedHeaders(HttpHeaders.CONTENT_TYPE, "X-XSRF-TOKEN")
                .allowCredentials(true)
                .allowedMethods("GET", "POST");
    }
}