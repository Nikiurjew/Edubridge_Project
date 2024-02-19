package com.example.springboot.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springboot.model.Admin;



public interface AdminRepository extends JpaRepository<Admin,Integer> {
	
	Optional<Admin> findByAdminEmailIdAndAdminPassword(String emailId,String password);
}