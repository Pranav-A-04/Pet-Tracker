#include "FirebaseESP8266.h" 
#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define FIREBASE_HOST "pet-tracker-a136c-default-rtdb.firebaseio.com/" 
#define FIREBASE_AUTH "AIzaSyAPSfgghGrN2iN5lhxaSq5F_5iGj73aIxo"
#define WIFI_SSID "test"
#define WIFI_PASSWORD "12345678"

FirebaseData firebaseData;
FirebaseData Data;

FirebaseJson json;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
String hrMin = "", curDay = "", monthYr = "", epoch="";


double lat=12.923805;
double lng=77.498556;
double lat1=lat;
double lng1=lng;
String final;

void setup() {

  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  timeClient.begin();
  timeClient.setTimeOffset((5 * 60 + 30) * 60);
}
void loop() {

  getTime();
  String final=(String(lat1,4)+","+String(lng1,4));
  Firebase.setString(firebaseData, "/LatLong/" + epoch, final);
  Serial.print("/LatLong/" + epoch + "/");
  Serial.println(final);
  lat1=lat1+(rand()%5)*0.0001;
  lng1=lng1+(rand()%5)*0.0001;
  delay(5000);
}

void getTime() {

  timeClient.update();

  int currentHour = timeClient.getHours();

  int currentMinute = timeClient.getMinutes();

  time_t epochTime = timeClient.getEpochTime();
  epoch = String(epochTime);
  struct tm *ptm = gmtime ((time_t *)&epochTime);

  int monthDay = ptm->tm_mday;

  int currentMonth = ptm->tm_mon + 1;

  int currentYear = ptm->tm_year + 1900;

  monthYr = String(currentMonth) + "-" + String(currentYear);
  curDay = String(monthDay);
  hrMin = String(currentHour) + String(currentMinute);
  //Serial.println(monthYr + "\n" + curDay + "\n" + hrMin);


  return;
}
