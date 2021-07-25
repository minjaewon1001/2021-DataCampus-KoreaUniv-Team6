# CNN(Convolutional neural network)이란?
> 본 문서는 이미지인식에 있어서 기초가 되는 CNN에 대해서 학습하고 정리한 문서이다. facenet을 공부하기 전에 CNN을 먼저 공부하면 한결 편하게 논문을 읽을 수 있을 것으로 기대된다.

## 0. 개요
fully connected layer 만으로 구성된 인공 신경만의 입력 데이터는 1차원의 배열 형태로 한정된다. 한장의 컬러 사진은 3차원 데이터이고, 배치 모드에 사용되는 여러장의 사진은 4차원 데이터이므로
사진데이터로 FC 신경망을 학습시켜야 할 때는 3차원 사진데이터를 1차원으로 평면화 시켜야한다. 그 과정에서 공간정보의 손실이 발생하는데, 그로 인한 정보 부족으로 인공 신경망이 특징을 추출하고 학습하는
효율이 떨어지게 되고 정확도를 높이는데 한계가 발생한다.   
이미지의 공간 정보를 유지한 상태로 학습이 가능한 모델이 바로 CNN(Convolutional neural network)이다.

> * fully connected layer
> 이전 레이어의 모든 노드가 다음 레이어의 모든 노드에 연결된 레이어를 FC 레이어라고 한다. (=Dense layer)

### Fully Connected Neural Network와 다른 점
* 각 레이어의 입출력 데이터의 형상 유지
* 이미지의 공간 정보를 유지하면서 인접 이미지와의 특징을 효과적으로 인식
* 여러 필터로 이미지의 특징 추출 및 학습
* 추출한 이미지의 특징을 모으고 강화하는 pooling 레이어
* 필터를 공유 파라미터로 사용하기 때문에, 일반 인공 신경망과 비교하여 학습 파라미터가 매우 적음

### cnn의 구조
* 특징 추출(Feature Extraction) + 클래스 분류기(Classifier) -> 이 사이에 이미지 형태의 데이터를 배열 형태로 만드는 flatten layer
![image](https://user-images.githubusercontent.com/67731178/126896437-26467228-3c3b-4890-a153-57dead62c7f4.png)

## 1. 특징 추출
* convolution layer와 pooling layer를 반복하여 구성
* convolution layer는 입력 데이터에 필터를 적용 후 활성화 함수를 반영하는 필수 요소
* Convolution Layer는 Filter 크기, Stride, Padding 적용 여부, Max Pooling 크기에 따라서 출력 데이터의 Shape이 변경된다.
* pooling layer는 선택적 레이어
* 이미지 특징 추출을 위하여 입력 데이터를 필터가 순회하며 합성곱을 계산하고, 그 계산결과를 이용하여 feature map을 만든다.
* 특징 표현 학습 : 특징 추출기법인 컨볼루션(합성곱) 연산을 사용하여 이미지의 픽셀을 주변의 픽셀의 조합으로 대체하는 방식.

### 1.1 합성곱(Convolution)
![image](https://user-images.githubusercontent.com/67731178/126896110-c7502e06-0df7-4d62-b7ac-b67212192036.png)

Feature Detector : (Filter or Kernel) <2차원 입력데이터를 1개의 필터로 합성곱 연산을 수행하는 과정> 

* 이미지를 기준으로 설명하면 이미지들의 Feature map을 찾는 것을 의미함.
* 데이터의 형상을 유지함 -> 이미지와 같은 형상이 존재하는 데이터에 적합한 연산임
* 특정 크기를 가진 필터를 일정간격으로 이동하면서 입력 데이터에 연산을 적용함

### 1.2 이미지(image) / 채널(Channel)
* 이미지는 기본적으로 세개의 채널로 이루어져있음. 색이 있기 때문에 RGB로 이루어져있음
* 흑백 데이터의 경우 2차원 데이터로 1개 채널로 구성됨
* 컨볼루션 레이어는 각 채널에 대해 계산을 해서 feature map을 추출함
* 일반적인 CNN은 여러 개의 컨볼루션 레이어를 쌓는다.

### 1.3 필터(filter), 커널(Kernel) / 스트라이드(Strid) / Activation Map
![image](https://user-images.githubusercontent.com/67731178/126896318-2e1a6a8a-7f3a-473d-a408-028c11b83908.png)

* 어떤 필터(=커널)를 사용하느냐에 따라 찾을 수 있는 이미지의 특징이 달라짐 (찾고자하는 목표인 가중치같은 느낌)
* 학습을 통해서 점차 특징을 잘찾는 필터가 생성되도록 함
* 필터 당 하나의 feature map이 형성됨. Convolution layer에서는 생성된 feature map을 스택처럼 쌓아놓음. 즉 n개의 필터가 적용되면 출력 데이터는 n개의 채널을 갖게 됨.
* 필터는 입력 데이터를 지정한 간격으로 순회하면서 합성곱을 계산함. 여기서 지정도니 간격으로 필터를 순회하는 간격을 Stride라고 한다.
![image](https://user-images.githubusercontent.com/67731178/126896356-1366f0fd-7cba-4e51-8342-9dfe66957976.png)
* Feature Map은 합성곱 계산으로 만들어진 행렬이고, Activation Map은 Feature Map 행렬에 활성 함수를 적용한 결과임. 즉 Convolution 레이어의 최종 출력 결과가 Activation Map이다.

### 1.4 패딩(Padding)
![image](https://user-images.githubusercontent.com/67731178/126896414-b1d83b6c-966d-4316-a403-98e4213a97db.png)

* Convolution 레이어에서 Filter와 Stride에 작용으로 Feature Map 크기는 입력데이터 보다 작으므로, Convolution 레이어의 출력 데이터가 줄어드는 것을 방지하는 방법이 패딩이다. 
* 패딩은 입력 데이터의 외각에 지정된 픽셀만큼 특정 값으로 채워 넣는 것을 의미한다. (보통 패딩 값으로 0으로 채움)

### 1.5 풀링(Pooling)
* 연산의 효율성을 높이기 위해 출력데이터의 크기를 축소하는 것을 pooling이라고 한다.
* 인접 픽셀들 중에서 중요한 정보만을 남기기 위해서 서브 샘플링 기법을 사용함. 이것은 이미지를 구성하는 픽셀들이 인접한 픽셀들끼리는 비슷한 정보를 가진다는 특성에 기반함. 
* Feature의 특징을 추출한 데이터의 사이즈를 줄이는 것인데, 이를 통해 과적합을 방지하고 효율적인 계산을 하게 함.
* Max Pooling과 Average Pooning, Min Pooling이 있음. 정사각 행렬의 특정 영역 안에 값의 최댓값을 모으거나 특정 영역의 평균을 구하는 방식으로 동작함. (일반적으로 max pooling 사용)
![image](https://user-images.githubusercontent.com/67731178/126896534-f695a544-f45b-43f0-864d-dd3f1abd1eb8.png)

* 해당 레이어는 가중치가 존재하지 않아서 학습되지 않는 레이어임. 학습 대상 파라미터가 없다.

## 2. 분류기
위의 과정을 마치고 Flatten을 시킨 다음 FC layer(soft-max layer)를 통해 분류한다.

## 3. CNN모델의 성능향상
1.	레이어를 더 쌓는 법
2.	이미지 보강법(image Augmentation)   
: 훈련 데이터를 보강하는 방식. 여러 변형을 시켜서 원본을 여러 개의 데이터로 만들어냄. 그리고 이를 학습 데이터에 포함시키는 방법

***

# Bottleneck

*(Pooling에서 이어짐)*

그러나 분석의 대상이 3차원 데이터라면 해당 feature는 Channel값을 갖게 된다.
Channel값이 많아지는 경우 연산에 걸리는 속도도 그만큼 증가할 수 밖에 없는데, 이때 channel의 차원을 축소하는 개념이 **Bottleneck layer**이다.

* 1x1 convolution : 차원 축소에 쓰이는 방식 -> 실제로 convolution의 의미는 사라지는 것 같다. 그러나 딥러닝에서는 필터의 수를 조절할 때 쓰인다.

기본적으로 convolution 파라미터의 size(개수)는 다음과 같다.
* Convolution parameters= Input Channel X 필터 폭 X 필터 높이 X Output Channel
여기서 1x1 convolution을 input 값에 convolution해주면 해당 input의 channel은 1x1 convolution의 filter의 수만큼 축소된다. 
![image](https://user-images.githubusercontent.com/67731178/126896941-711afe50-fc0c-4a87-a19d-9dc0495e2b56.png)

출처 C4W2L06 Inception Network Motivation

이렇게 줄어든 feature를 통해 3x3, 5x5등의 convolution을 위해 연산에 사용되는 parameter를 줄여 연산의 효율성을 높인다.   
차원이 축소된 정보로 연산량을 크게 줄일 수 있는 것이다. 이러한 구조를 bottleneck이라고 한다. ><모양으로 생겼는데, 1x1로 좁아졌다가 3x3(원래하고자 했던 연산)을 한다.
