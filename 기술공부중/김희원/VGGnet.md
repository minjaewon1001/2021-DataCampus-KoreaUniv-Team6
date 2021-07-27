> VGG16 – Convolutional Network for Classification and Detection
>
> 2018.11.20

![image](https://user-images.githubusercontent.com/87646049/127168598-649d5dda-6655-4b32-858d-32b0e843f470.png)

-  Oxford 대학의 K. Simonyan과 A. Zisserman이 "Very Deep Convolutional Networks for Large-Scale Image Recognition" 논문에서 제안한 길쌈 신경망 모델입니다
-  ImageNet에서 92.7%의 상위 5개 테스트 정확도 (1000개 클래스에 속하는 1400만 개 이상의 이미지 데이터 세트)
-  큰 커널 크기 필터(첫 번째 및 두 번째 컨볼루션 계층에서 각각 11 및 5)를 여러 3x3 커널 크기 필터로 차례로 교체하여 AlexNet보다 개선되었
-  (VGG16은 몇 주 동안 훈련되었으며 NVIDIA Titan Black GPU를 사용함)

![image](https://user-images.githubusercontent.com/87646049/127169064-c6f54fb6-c523-4b7f-896d-abd3fa352f04.png)

![image](https://user-images.githubusercontent.com/87646049/127169197-6fe4f630-1b5e-42d4-beaf-61f113ab0d54.png)

- cov1 레이어에 대한 입력은 고정 크기 224 x 224 RGB 이미지
- 필터는 3x3
- 구성 중 하나에서 입력 채널의 선형 변환(비선형성 뒤따름)으로 볼 수 있는 1x1 컨볼루션 필터도 사용함
- conv의 공간 패딩 레이어 입력은 컨볼루션 후에 공간 해상도가 유지되도록 하는 것
- 패딩은 3x3 conv에 대해 1픽셀
- 공간 풀링은 conv의 일부를 따르는 5개의 최대 풀링 레이어에 의해 수행됨
- Max-pooling은 2×2 픽셀 윈도우에서 수행됨


## 단점
- 훈련이 매우 느림 (파라미터 수가 너무 많아서)
- 네트워크 아키텍쳐 가중치 자체가 상당히 큼 (디스크/대역폭 관련 문제)
