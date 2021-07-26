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


# Face detection methods (4가지)

## 1. Knowledge-based
- 얼굴이 서로 일정한 거리와 위치 내에 코, 눈, 입이 있어야 함
- 문제는 적절한 규칙 집합을 구축하는 것 (너무 상세하지 않게)
- 모든 피부색에 대해 작동x
- 조명 조건에 영향을 크게 

![image](https://user-images.githubusercontent.com/87646049/126885532-b7031a90-c241-4c20-bd9e-8d3baf97b103.png)


## 2. Template matching
- 템플릿 매칭 방법은 미리 정의되거나 매개변수화된 얼굴 템플릿을 사용하여 미리 정의되거나 변형 가능한 템플릿과 입력 이미지 간의 상관 관계를 통해 얼굴을 찾거나 감지함
- 즉, 참조 영상(reference image)에서 템플릿(template) 영상과 매칭되는 위치를 탐색하는 방법이다.
- 엣지 검출 방법을 사용하여 엣지로 얼굴 모델을 구성할 수 있음

![image](https://user-images.githubusercontent.com/87646049/126885675-564c2add-cabe-4745-b67d-6884f482ff83.png)
![image](https://user-images.githubusercontent.com/87646049/127001357-8ad5ce51-fc58-4750-a6bc-bfb2c294759a.png)

- 변형 기술로 'controlled background technique'가 있다. 정면 얼굴사진과 배경 사진이 있다면, 얼굴 영역을 제외한 배경을 제거할 수 있다.
- Template maching은 이동(translation) 문제는 해결할 수 있는 반면, 회전 및 스케일링된 물체의 매칭은 어려운 문제이다.


## 3. Feature-based face detection
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


## 4. Appearance-based face detection
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

#### 5) Naive Bayes Classifiers

#### 6) Inductive learning

#### 7) Neural networks


# Video Processing: Motion-based face detection
- 비디오 이미지에서 움직임을 가이드로 사용할 수 있음
- 즉, 특정 얼굴 움직임 중 하나가 눈을 깜박이는 것이라면, 소프트웨어가 규칙적인 눈 깜박임 패턴을 결정할 수 있다면 얼굴을 결정할 수 있다.

![image](https://user-images.githubusercontent.com/87646049/126894632-9dcb6b71-fba0-4c22-9968-f76944fe24fc.png)

- 다른 다양한 동작들은 벌린 콧구멍, 올라간 눈썹, 주름진 이마, 열린 입과 같이 이미지에 얼굴이 포함될 수 있음을 나타냅니다. 
- 얼굴이 감지되고 특정 얼굴 모델이 특정 움직임과 일치하면, 추가적인 얼굴의 움직임을 포착하는 얼굴 추적이 가능합니다.
- 최첨단(state-of-the-art) 솔루션은 일반적으로 feature을 추출하는 여러 가지 방법(예를 들어 기계 학습 또는 딥 러닝 알고리즘)을 결합합니다.

## Face detection tools
단순한 얼굴 감지에서 감정 감지 및 얼굴 인식에 이르기까지 다양한 기능을 제공하는 독점 및 오픈 소스의 수십 가지 얼굴 감지 솔루션이 있습니다.

## 독점 face detection software

##### 1) Amazon Rekognition
- 딥러닝 기반
- face detection & face recognition 모두에 강력함
- 8가지 감정도 감지할 수 있음 (기쁨, 슬픔, 화남 등)
- 단일 이미지에서 최대 100개의 얼굴 판별 가능

##### 2) Face++
- iOS 및 Android용 오프라인 SDK(소프트웨어 개발 키트)를 포함하는 얼굴 분석 클라우드 서비스
- 총 요청 횟수에 제한은 없지만, 초당 3회 제한
- Python, PHP, Java, Javascript, C++, Ruby, iOS, Matlab 지원
- 성별, 감정 인식 및 연령대 추정, 랜드마크 감지 서비스 제공
- Leveno 제품에 포함됨

##### 3) Lambda Labs (Face Recognition and Face Detection API)
- 얼굴 인식, 얼굴 감지, 눈.코.입 위치, 성별 분류 제공

##### 4) Kairos (API)
- 다양한 이미지 인식 솔루션 제공
- 성별, 나이, 얼굴 인식, 사진 및 비디오의 감정적 깊이 식별

##### 5) Microsoft Azure Cognitive Services Face API
- 기능에는 연령 추정, 성별 및 감정 인식, 랜드마크 감지가 포함됨
- SDK는 Go, Python, Java, .Net 및 Node.js를 지원함

##### 6) Paravision 

##### 7) Trueface


## 오픈 소스 face detection software

##### 1) Ageitgey/face_recognition
- 가장 광범위한 얼굴 인식 라이브러리 중 하나인 40,000개의 별이 있는 GitHub 저장소
- "파이썬 및 명령줄을 위한 가장 간단한 얼굴 인식 API"라고도 함
- 단점은 최신 릴리즈가 2018년에 출시되었다는 것이며, 2021년에는 모델 인식 정확도가 99.38%로 훨씬 더 좋아질 수 있다는 것임
- REST API가 없음

##### 2) Deepface
- GitHub에서 별 1,5000개를 받은 Python용 프레임워크
- 나이, 성별, 인종 및 감정과 같은 얼굴 속성 분석을 제공
- REST API 제공
 
##### 3) FaceNet
- Google에서 개발
- Python 라이브러리를 사용하여 구현
- 

##### 4) InsightFace
- GitHub에서 9,2000개의 별을 가진 또 다른 Python 라이브러리
- 인식 정확도는 99.86%
- 얼굴 감지, 인식 및 정렬을 위한 다양한 알고리즘을 제공함
 
##### 5) InsightFace-REST
- InsightFace 얼굴 감지 및 인식 파이프라인을 위해 편리하고 쉽게 배포 가능하며 확장 가능한 REST API를 제공하는 것을 목표로 함
 
##### 6) OpenCV
- API가 아님
- 3,000개 이상의 최적화된 컴퓨터 비전 알고리즘이 있음
- ex) Eigenfacerecognizer, LBPHFacerecognizer, lpbhfacerecognition 얼굴 인식 모듈 등

##### 7) OpenFace
- 심층 신경망을 사용해 얼굴 인식의 Python 및 Torch 구현
- 참조: CVPR 2015 paper "FaceNet: A Unified Embedding for Face Recognition and Clustering"

# 결론
- 얼굴 감지는 인식, 감정 감지 또는 얼굴 생성을 포함한 추가 얼굴 분석을 위한 첫 번째 단계임
- 또한 추가 처리를 위해 필요한 모든 데이터를 수집하는 것이 중요함
