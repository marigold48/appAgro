#!/usr/bin/env python

import unittest
from selenium import webdriver


class TestIndexAgro(unittest.TestCase):
    
    def setUp(self):
        self.browser = webdriver.Firefox()
        
    def testTitle(self):
        self.browser.get('http://localhost:3102/')
        self.assertIn('Login', self.browser.title)
        
    def tearDown(self):
        self.browser.quit()


if __name__ == '__main__':
    unittest.main(verbosity=2)