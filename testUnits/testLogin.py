import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException


class TestLoginAgro(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Firefox()

	def testLogin(self):
		self.browser.get("http://localhost:3102")
  
		usr = self.browser.find_element_by_id("user")
		pwd = self.browser.find_element_by_id("password")
		old_url = self.browser.current_url

		submit   = self.browser.find_element_by_id("submit")
  
		usr.send_keys("tester")
		pwd.send_keys("tester")
		submit.click()
  

		wait = WebDriverWait( self.browser, 5 )

		try:
			page_loaded = wait.until(lambda browser : self.browser.current_url != old_url)

			self.assertEqual(
				self.browser.title,
				"LoginOK",
				msg = "Login no correcto"
				)
			
		except TimeoutException:
			self.fail( "Loading timeout expired" )

	def tearDown(self):
		self.browser.quit()

if __name__ == '__main__':
    unittest.main(verbosity=2)
