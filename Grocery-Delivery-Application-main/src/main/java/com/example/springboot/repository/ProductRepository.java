package com.example.springboot.repository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.model.Category;
import com.example.springboot.model.Product;


@Repository
public interface ProductRepository  extends JpaRepository<Product, Long>, PagingAndSortingRepository<Product, Long> {
	public List<Product> findByProductId(long productId);
	//public Product updateProduct(long ProductId);
	public List<Product> findByCategory(Category category);
	public Page<Product> findByCategory(Category category, Pageable page);

}