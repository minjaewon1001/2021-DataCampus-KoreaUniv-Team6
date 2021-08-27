## 데이터 수집
1. AutoCrawler, Selenium, BeautifulSoup를 사용하여 연예인 이미지 데이터 수집.   

## 데이터 전처리
1. Vision API, 화면캡쳐를 통해 연예인 Face Crop   
2. 학습에 부적절한 데이터 필터링
3. keras.preprocessing.image  ImageDataGenerator

## 모델 선정 및 학습
1. Colab Pro에서 FaceNet기반 Pre-trained InceptionResNetV1를 import.
2. 442 add_41 layer까지 불러오고 마지막 layer에 Flatten, Dense layer추가하여
3. 라벨링된 이미지 데이터 학습시킴.

## Chrome Extention

## HTML / CSS / JS


