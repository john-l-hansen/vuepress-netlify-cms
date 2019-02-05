---
title: Android Miscellaneous
---
## 4.1 Core Library Interface

```java
public interface CoreInterface { 
 
	public String getLibraryVersion(); 
 
	public void init(String packageName, String version, String apiKey, String sdkOwner, Context context); 
 
	public void shutdown(Context context); 
 
	public void onPause(Context context); 
 
	public void onResume(Context context); 
 
	public AbstractNetworkAsyncTask register(LoginStatusCallback loginStatusCallbackHandler, User user, String password); 
 
	public AbstractNetworkAsyncTask updateProfile(User user); 
 
	public AbstractNetworkAsyncTask login(LoginStatusCallback loginStatusCallbackHandler, String user, LoginType type, String password); 
 
	public void logout(); 
 
	public AbstractNetworkAsyncTask forgotPassword(String email); 
 
	public AbstractNetworkAsyncTask changePassword(String oldPassword, String newPassword); 
 
	public int getWalletSize(String walletType); 
 
	public Set<String> getWalletTypes(); 
 
	public void addOnWalletChangeListener(String walletType, WalletListener listener); 
 
	public void removeOnWalletChangeListener(String walletType, WalletListener listener); 

	public AbstractNetworkAsyncTask saveOfferToWallet(SaveToWalletCallback saveToWalletCallbackHandler, DigitalOffer offer) throws UserNotLoginException; 
 
	public void starListening(); 
 
	public void stopListening(); 
 
	public void syncWallet(); 
 
	public DigitalOfferLight getWalletItem(String walletType,int index); 
 
	public DigitalOffer getWalletItemDetail(String walletType,int index); 
 
	public List<DigitalOfferLight> getWalletLightInfoList(String walletType); 
 
	public void deleteWalletItem(String walletType,int index); 
 
	public void getResources(MediaPoolCallbackInterface callbackHandler, List<String> urls); 
 
	public void stopResourcesRequest(MediaPoolCallbackInterface callbackHandler); 

	@Deprecated 
	public MediaPoolInterface getMediaPoolManager(); 
 
	public void setRequestFromServerListener(RequestFromServerCallBack listener); 
 
	public void replyServerRequest(String fieldName, String value, String type); 
 
	public void redeemOnline(String offerID, String source); 
 
	public void setAutoMode(boolean autoMode); 

	public boolean isAutoModeOn(); 

	public boolean isUserLogged(); 
 
	public boolean isInitialized(); 

	public void setOfferListener(OfferListener listener); 	 
} 
```




## 4.2 Listeners Interface

```java
public static interface OfferListener{ 	 
		public void onNewOffer(final DigitalOffer offer); 
} 
 
public static interface OnInitListener{ 
		public void onInitDone(int errorCode); 
} 
 
public static interface RequestFromServerCallBack extends NetworkStatusCallback { 	
	public void onRequestFromServerStatus(RequestFromServerStatus status); 
} 
 
public static interface OnRequestFromServerListener{ 	 	
	public void onRequest(); 
} 
 
public static interface LoginStatusCallback extends NetworkStatusCallback { 	
	public void onLogin(LoginStatus status); 
} 
 
public static interface WalletListener { 	 	 
	 public void onWalletChanged(String source, final int size, final List<DigitalOffer> offerChanged); 
} 
```




## 4.2 Listeners Interface

```java
public static interface OfferListener{ 	 
		public void onNewOffer(final DigitalOffer offer); 
} 
 
public static interface OnInitListener{ 
		public void onInitDone(int errorCode); 
} 
 
public static interface RequestFromServerCallBack extends NetworkStatusCallback { 	
	public void onRequestFromServerStatus(RequestFromServerStatus status); 
} 
 
public static interface OnRequestFromServerListener{ 	 	
	public void onRequest(); 
} 
 
public static interface LoginStatusCallback extends NetworkStatusCallback { 	
	public void onLogin(LoginStatus status); 
} 
 
public static interface WalletListener { 	 	 
	 public void onWalletChanged(String source, final int size, final List<DigitalOffer> offerChanged); 
} 
```
