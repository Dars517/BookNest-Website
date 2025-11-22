-- Drop old database if exists
DROP DATABASE IF EXISTS booknest;

-- Create fresh database
CREATE DATABASE booknest;
USE booknest;

-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','admin') DEFAULT 'user'
);

-- Books Table
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  author VARCHAR(100),
  category VARCHAR(100),
  price DECIMAL(10,2),
  image VARCHAR(255)
);

-- Cart Table
CREATE TABLE cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  book_id INT,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Orders Table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fullname VARCHAR(100),
  address TEXT,
  phone VARCHAR(15),
  payment VARCHAR(50),
  status ENUM('Pending','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
  FOREIGN KEY (user_id) REFERENCES users(id)
);



-- Wishlist Table
CREATE TABLE wishlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  book_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Order Items Table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  book_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id)
);


-- Insert Admin User
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@booknest.com', "admin123", 'admin');

-- Insert Books
INSERT INTO books (title, author, category, price, image) VALUES
('IKIGAI', 'Hector Garcia', 'popular', 319, '../image/p1.jpg'),
('RICH DAD POOR DAD', 'Robert T. Kiyosaki', 'popular', 355, '../image/p2.jpg'),
('ATOMIC HABITS', 'James Clear', 'popular', 491, '../image/p3.jpg'),
('DONT BELIEVE EVERYTHING YOU THINK', 'Joseph Nguyen', 'popular', 169, '../image/p4.jpg'),
('THE ART OF BEING ALONE', 'Colleen Hoover', 'popular', 299, '../image/p5.jpg'),

('PERCY JACKSON', 'Rick Riordan', 'horror', 311, '../image/h1.jpg'),
('FRANKENSTEIN', 'Mary Shelley', 'horror', 92, '../image/h2.jpg'),
('THAT NIGHT', 'Nidhi Upadhyay', 'horror', 150, '../image/h3.jpg'),
('DRACULA', 'Bram Stoker', 'horror', 428, '../image/h4.jpg'),
('METAMORPHOSIS', 'Franz Kafka', 'horror', 89, '../image/h5.jpg'),

('Football Fever', 'Srinjoy Chowdhury', 'sports', 172, '../image/s1.jpg'),
('ICE HOCKEY', 'Steve Cameron', 'sports', 1939, '../image/s2.jpg'),
('CRICKET', 'Jon Hotten', 'sports', 372, '../image/s3.jpg'),
('UFC', 'Wes Carsen', 'sports', 199, '../image/s4.jpg'),
('BASKETBALL', 'Chad Millman', 'sports', 782, '../image/s5.jpg'),

('CRISTIANO RONALDO', 'Guillem Balague', 'recommend', 449, '../image/b1.jpg'),
('FRANKENSTEIN', 'Mary Shelley', 'recommend', 92, '../image/h2.jpg'),
('LIONEL MESSI', 'Guillem Balague', 'recommend', 509, '../image/b3.jpg'),
('RICH DAD POOR DAD', 'Robert T. Kiyosaki', 'recommend', 355, '../image/p2.jpg'),
('THE ART OF BEING ALONE', 'Colleen Hoover', 'recommend', 299, '../image/p5.jpg'),

('ENGLISH TEXTBOOK', 'Pushpendra Kaur', '10th', 116, '../image/101.jpg'),
('MATHEMATICS', 'Ncert', '10th', 70, '../image/102.jpg'),
('SCIENCE', 'Ncertkart Books', '10th', 88, '../image/103.jpg'),
('SOCIAL SCIENCE', 'Kirti Sharma', '10th', 512, '../image/104.jpg'),
('GOLDEN HINDI', 'Sanchayan Mehta', '10th', 298, '../image/105.jpg'),

('BUSINESS STUDIES', 'Nidhi Jain', '12th', 191, '../image/121.jpg'),
('ENGLISH-CORE', 'Parneet Kaur', '12th', 309, '../image/122.jpg'),
('INFORMATICS PRACTICES', 'Matt Haig', '12th', 642, '../image/123.jpg'),
('ECONOMICS', 'Neeraj Publication', '12th', 239, '../image/124.jpg'),
('ACCOUNTANCY', 'Pankaj Yaduvanshi', '12th', 300, '../image/125.jpg'),

('SPIDER-MAN', 'Donny Cates', 'comics', 299, '../image/c1.jpg'),
('CAPTAIN AMERICA', 'Alan Gratz', 'comics', 354, '../image/c2.jpg'),
('AVENGERS', 'Jason Aaron', 'comics', 149, '../image/c3.jpg'),
('THE LAST KID ON EARTH', 'Smith Fery', 'comics', 289, '../image/c4.jpg'),
('THE JUNGLE BOOK', 'Wonder House Book', 'comics', 208, '../image/c5.jpg'),

('CRISTIANO RONALDO', 'Guillem Balague', 'biography', 449, '../image/b1.jpg'),
('DHONI TOUCH', 'Bharat Sundaresan', 'biography', 263, '../image/b2.jpg'),
('LIONEL MESSI', 'Guillem Balague', 'biography', 509, '../image/b3.jpg'),
('CONOR MCGREGOR', 'John Smith', 'biography', 1452, '../image/b4.jpg'),
('CHASE YOUR DREAMS', 'Sachin Tendulkar', 'biography', 199, '../image/b5.jpg'),

('Clean Code', 'Robert C. Martin', 'programming', 499.00, '../image/cleancode.jpg'),
('JavaScript: The Good Parts', 'Douglas Crockford', 'programming', 299.00, '../image/jsgoodparts.jpg'),
('Eloquent JavaScript', 'Marijn Haverbeke', 'programming', 399.00, '../image/eloquentjs.jpg'),
('The Pragmatic Programmer', 'Andrew Hunt & David Thomas', 'programming', 599.00, '../image/pragprog.jpg'),
('Design Patterns', 'Erich Gamma et al.', 'programming', 699.00, '../image/designpatterns.jpg');
