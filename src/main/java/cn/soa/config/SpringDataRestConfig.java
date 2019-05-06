package cn.soa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import cn.soa.entity.Material;
import cn.soa.entity.MaterialHistory;

@Configuration
public class SpringDataRestConfig {
	@Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {
 
        return new RepositoryRestConfigurerAdapter() {
            @Override
            public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
                config.exposeIdsFor(Material.class,MaterialHistory.class);
            }
        };
    }

}
