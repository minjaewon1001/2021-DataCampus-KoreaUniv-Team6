< Face Detection Explained: State-of-the-Art Methods and Best Tools>
=====================================================================

> 출처 : Sciforce
> 
> 발행일 : 2021/06/17
> 
> url : https://medium.com/sciforce/face-detection-explained-state-of-the-art-methods-and-best-tools-f730fca16294


- Face detection은 이미지나 영상에 잡힌 얼굴들을 모두 검출하지만, 세부적인 사항을 기억하지는 않는다. 마찬가지로 인구통계학적인 특성(연령대, 성별)은 설명해줄 수 있으나, 누구인지 개개인을 식별해주지는 않는다.
- Face recognition은 이미지나 영상에 있는 얼굴들을 얼굴 데이터베이스에 이미 존재하는 얼굴들에 대해 식별한다. 따라서 얼굴을 식별하기 위해서는 실제로 얼굴을 시스템에 등록해 데이터베이스를 생성해야 한다.

![image](https://user-images.githubusercontent.com/87646049/126888014-ce175b3f-4eeb-4534-8a2a-7c937e85dfd6.png)


## Face detection methods

### ① Knowledge-based
- 얼굴이 서로 일정한 거리와 위치 내에 코, 눈, 입이 있어야 함
- 문제는 적절한 규칙 집합을 구축하는 것 (너무 상세하지 않게)

![image](https://user-images.githubusercontent.com/87646049/126885532-b7031a90-c241-4c20-bd9e-8d3baf97b103.png)


### ② Template matching
- 템플릿 매칭 방법은 미리 정의되거나 매개변수화된 얼굴 템플릿을 사용하여 미리 정의되거나 변형 가능한 템플릿과 입력 이미지 간의 상관 관계를 통해 얼굴을 찾거나 감지함
- 엣지 검출 방법을 사용하여 엣지로 얼굴 모델을 구성할 수 있음

![image](https://user-images.githubusercontent.com/87646049/126885675-564c2add-cabe-4745-b67d-6884f482ff83.png)

- 변형 기술로 'controlled background technique'가 있다. 정면 얼굴사진과 배경 사진이 있다면, 얼굴 영역을 제외한 배경을 제거할 수 있다..?


### ③ Feature-based face detection
- 특징 기반 방법은 얼굴의 구조적 특징을 추출한다. 분류기로 학습시킨 다음 얼굴 및 비얼굴 영역을 구별하는 데 사용됨
- 이 방법의 한 예는 'color-based face detection'인데, 컬러 이미지 또는 비디오에서 일반적인 피부색을 가진 영역을 스캔한 다음 얼굴 부분을 찾는 기법임

#### Harr Feature Selection
- 인간 얼굴의 유사한 속성에 의존하여 얼굴 특징(눈, 입, 콧등의 위치 및 크기, 픽셀 강도의 방향 기울기)의 일치 여부를 확인함
- 38개의 계단식 분류기를 통해 총 6061개의 feature를 얼굴 정면 사진에서 추출할 수 있음
- HOG(Histogram of Oriented Gradients)는 객체 감지를 위한 특징 추출기
- 추출된 특징은 이미지의 기울기(방향 기울기) 방향의 분포(히스토그램)

* 참고 자료 : https://blog.naver.com/zeus05100/221877166103

#### HOG(Histogram of Oriented Gradients)
- 객체 감지를 위한 특징 추출기
- 추출된 특징은 이미지의 기울기(방향 기울기), 방향의 분포(히스토그램)
- 그라디언트는 일반적으로 크고 둥근 모서리와 모서리이며 이러한 영역을 감지할 수 있게 함
- 픽셀 강도를 고려하는 대신, 이미지 세그먼트를 지역화하기 위해 빛 방향을 나타내기 위해 그래디언트 벡터의 발생을 계산한다. 
- 이 방법은 overlapping local중복 로컬 대비 정규화를 사용하여 정확도를 개선한다.

![image](https://user-images.githubusercontent.com/87646049/126886015-e62b23b2-594b-4648-8cc5-44a24856c33b.png)


### ④ Appearance-based face detection
- 얼굴 모델을 찾기 위해 일련의 대표 훈련 얼굴 이미지에 의존함
- 얼굴 이미지의 관련 특성을 찾고 특징을 추출하기 위해 기계 학습 및 통계 분석에 의존함
- 이 방법은 여러 알고리즘을 통합함 (아래 서술)

#### 1) Eigenface-based algorithm
- PCA(Principal Component Analysis)를 사용하여 얼굴을 효율적으로 나타냄
- PCA는 데이터의 변화를 가장 잘 설명할 수 있도록 이미지의 차원을 축소함
- 이 방법에서 얼굴은 고유 벡터 집합의 선형 조합으로 모델링될 수 있음
- 이 경우 얼굴 인식은 선형 표현 계수의 비교를 기반으로 

![image](https://user-images.githubusercontent.com/87646049/126886371-d014cf92-68da-4d9f-ae93-73910a164e6f.png)

#### 2) Distribution-based algorithms


#### 3) Hidden Markov Model
- 표준 detection

#### 4) Sparse Network of Winnows
- 

#### 5) Naive Bayes Classifiers

#### 6) Inductive learning

#### 7) Neural networks


## Video Processing: Motion-based face detection
