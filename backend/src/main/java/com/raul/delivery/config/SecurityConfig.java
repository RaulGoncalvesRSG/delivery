package com.raul.delivery.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private Environment env;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			/*Configuração para liberar o acesso da aplicação para gerenciar o BD H2, caso contrário,
			n será possível acessar o BD H2*/
			http.headers().frameOptions().disable();
		}
		
		/*http.cors() faz a liberação baseado na configuração especificada no método
		csrf().disable() desabilita a proteção contra csrf q é um tipo ataque baseado contra seção.
		Como a aplicação é Rest e n guarda dados em seção, n tem perigo de sofrer esse tipo de ataque*/
		http.cors().and().csrf().disable();
		//SessionCreationPolicy.STATELESS - não armazena estado
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		//Libera acesso para todas requisições
		http.authorizeRequests().anyRequest().permitAll();
		http.headers().frameOptions().disable();
	}

	/*Cors é um recurso q os navegadores tem q bloqueiam qnd a aplicação está em um domínio tenta
	 * acessar uma aplicação q está em outro domínio, isso por padrão é bloqueado por motivo de 
	 * segurança. Como o back end será hosperado no hiroku e o front em outro domínio, é preciso
	 * liberar o Cors para o front end poder acessar o back end*/
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}