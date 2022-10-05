package com.cg.main.model;


import javax.persistence.Column;
/*
 * @Author: Dibyansu Mishra
 * @Start Date:19MAY2020 
 * @Update Date: 25MAY2020 [19:44]
 */
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
//Creating an entity class by using: @Entity 
@Entity
//Creating a table by using a user specified name
@Table(name = "Rto_User_db")
public class User {
	
	/*
	 * =========================================================================
	 * VARIABLES
	 * =========================================================================
	 */
	@Id
	@GeneratedValue
	@Column(name="appId")
	private Integer appId;
	@Column(name="userName")
	private String userName;
	@Column(name="vehicleType")
	private String vehicleType;
	@Column(name="phNo")
	private String phNo;
	@Column(name="email")
	private String email;
	@Column(name="dob")
	private String dob;
	@Column(name="gender")
	private String gender;
	@Column(name="bloodGroup")
	private String bloodGroup;
	@Column(name="address")
	private String address;
	@Column(name="country")
	private String country;
	@Column(name="state")
	private String state;
	@Column(name="pin")
	private Integer pin;
	@Column(name="llNo")
	private String llNo;
	@Column(name="dlNo")
	private String dlNo;
	@Column(name="testDriveDate")
	private String testDriveDate;
	@Column(name="licStatus")
	private String licStatus;
	@Column(name="applyDate")
	private String applyDate;
	@Column(name="expiryDate")
	private String expiryDate;
	@Column(name="adhar")
	private String adhar;
	@Column(name="bloodGroupCertificate")
	private String bloodGroupCertificate;
	@Column(name="certificate")
	private String certificate;
	
	
	/*
	 * =========================================================================
	 * CONSTRUCTERS
	 * =========================================================================
	 */
	public User() {
		
	}

	
	public User(Integer appId, String userName, String vehicleType, String phNo, String dob, String gender,
			String bloodGroup, String address, String country, String state, Integer pin, String llNo, String dlNo,
			String testDriveDate, String licStatus, String applyDate, String expiryDate, String adhar,
			String bloodGroupCertificate, String certificate,String email) {
		super();
		this.appId = appId;
		this.userName = userName;
		this.vehicleType = vehicleType;
		this.phNo = phNo;
		this.dob = dob;
		this.gender = gender;
		this.bloodGroup = bloodGroup;
		this.address = address;
		this.country = country;
		this.state = state;
		this.pin = pin;
		this.llNo = llNo;
		this.dlNo = dlNo;
		this.testDriveDate = testDriveDate;
		this.licStatus = licStatus;
		this.applyDate = applyDate;
		this.expiryDate = expiryDate;
		this.adhar = adhar;
		this.bloodGroupCertificate = bloodGroupCertificate;
		this.certificate = certificate;
		this.email=email;
	}


	/*
	 * =========================================================================
	 * GETTERS AND SETTERS
	 * =========================================================================
	 */

	


	public Integer getAppId() {
		return appId;
	}


	public void setAppId(Integer appId) {
		this.appId = appId;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getVehicleType() {
		return vehicleType;
	}


	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}


	public String getPhNo() {
		return phNo;
	}


	public void setPhNo(String phNo) {
		this.phNo = phNo;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getDob() {
		return dob;
	}


	public void setDob(String dob) {
		this.dob = dob;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public String getBloodGroup() {
		return bloodGroup;
	}


	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public Integer getPin() {
		return pin;
	}


	public void setPin(Integer pin) {
		this.pin = pin;
	}


	public String getLlNo() {
		return llNo;
	}


	public void setLlNo(String llNo) {
		this.llNo = llNo;
	}


	public String getDlNo() {
		return dlNo;
	}


	public void setDlNo(String dlNo) {
		this.dlNo = dlNo;
	}


	public String getTestDriveDate() {
		return testDriveDate;
	}


	public void setTestDriveDate(String testDriveDate) {
		this.testDriveDate = testDriveDate;
	}


	public String getLicStatus() {
		return licStatus;
	}


	public void setLicStatus(String licStatus) {
		this.licStatus = licStatus;
	}


	public String getApplyDate() {
		return applyDate;
	}


	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}


	public String getExpiryDate() {
		return expiryDate;
	}


	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}


	public String getAdhar() {
		return adhar;
	}


	public void setAdhar(String adhar) {
		this.adhar = adhar;
	}


	public String getBloodGroupCertificate() {
		return bloodGroupCertificate;
	}


	public void setBloodGroupCertificate(String bloodGroupCertificate) {
		this.bloodGroupCertificate = bloodGroupCertificate;
	}


	public String getCertificate() {
		return certificate;
	}


	public void setCertificate(String certificate) {
		this.certificate = certificate;
	}


	
	
	
	/*
	 * =========================================================================
	 * toString Method
	 * =========================================================================
	 */
	
	@Override
	public String toString() {
		return "User [appId=" + appId + ", userName=" + userName + ", vehicleType=" + vehicleType + ", phNo=" + phNo + ", Email=" +email
				+ ", dob=" + dob + ", gender=" + gender + ", bloodGroup=" + bloodGroup + ", address=" + address
				+ ", country=" + country + ", state=" + state + ", pin=" + pin + ", llNo=" + llNo + ", dlNo=" + dlNo
				+ ", testDriveDate=" + testDriveDate + ", licStatus=" + licStatus + ", applyDate=" + applyDate
				+ ", expiryDate=" + expiryDate + ", adhar=" + adhar + ", bloodGroupCertificate=" + bloodGroupCertificate
				+ ", certificate=" + certificate + "]";
	}

}