> 논문 주제 : YOLOv3: An Incermetal Improvement
> 
> 논문 리뷰 : https://deep-learning-study.tistory.com/509
> 
> 논문 구현 : https://deep-learning-study.tistory.com/568?category=983681

## 1. Kaggle에서 VOC Dataset 다운로드

#### 1) kaggle API를 활용하면 쉽게 dataset을 다운로드 할 수 있습니다.
kaggle api 다운받는 법 : https://teddylee777.github.io/kaggle/Kaggle-API-%EC%82%AC%EC%9A%A9%EB%B2%95
> 1) kaggle site 접속 https://www.kaggle.com/kimheewon4271/account?isEditing=False
> 2) my account 클릭
> 3) API란에 Create New API Token 클릭
> 참고 (코드로 다운받는법) : https://www.kaggle.com/c/two-sigma-financial-news/discussion/83593#487735

#### 2) 리눅스 명령어

리눅스 pwd 명령어, cd 명령어 사용법 정리 (현재 디렉토리 확인, 디렉토리 이동)
> https://withcoding.com/91

#### 3) Pascal voc dataset used in YOLOv3 video
데이터셋
> https://www.kaggle.com/aladdinpersson/pascal-voc-dataset-used-in-yolov3-video

#### 4) Augmentation
> https://nittaku.tistory.com/272
> https://deepbaksuvision.github.io/Modu_ObjectDetection/posts/03_04_augmentation.html

- 이미지를 부풀려서 성능을 더 좋게 만듬
- VGG 모델에서 많이 사용하고 벤치마킹함
- Augmentation을 넣어주면 기본적으로 성능이 좋아짐

- 1) 좌우반전, 2) 이미지 잘라주기, 3) 밝기 조절 등 수행

## 2. VOC Custom Dataset 생성하기

#### 1) CUDA란?
> https://kaen2891.tistory.com/20
- NVIDIA에서 개발한 GPU 개발 툴
- GPU에서 수행하는 (병렬 처리) 알고리즘을 C 프로그래밍 언어를 비롯한 산업 표준 언어를 사용하여 작성할 수 있도록 하는 GPGPU 기술

어떤 장치를 사용할 것인지 설정함
> device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
> 
> https://jeongwookie.github.io/2020/03/24/200324-pytorch-cuda-gpu-allocate/

#### 2) 커스텀 데이터셋 (Custom dataset)

> https://sanghyu.tistory.com/90
> https://wikidocs.net/57165

- Dataset을 상속받아 다음 메소드들을 오버라이드 하여 커스텀 데이터셋을 구축함

Custom dataset / dataloader 가 왜 필요한가?
- 데이터를 한번에 다 부르지 않고 하나씩만 불러서 쓰는 방식이 필요함
 
Dataset class
- 전체 dataset을 구성하는 단계
- input으로는 전체 x(input feature)과 y(label)을 tensor로 넣어주면 됨

Dataset 구성
- __init__(self): 데이터셋의 전처리를 해주는 부분
- __get_item__(self, index): 데이터셋에서 특정 1개의 샘플을 가져오는 함수
- __len__(self): 데이터셋의 길이. 즉, 총 샘플의 수를 적어주는 부분


![image](https://user-images.githubusercontent.com/87646049/127500894-1e83a23d-8e59-491e-8b16-4a685d4952d2.png)



## YOLO 에서 mAP와 FLS란?
> https://mickael-k.tistory.com/143

![image](https://user-images.githubusercontent.com/87646049/127490485-dc4dea0f-fd4c-4f2e-901e-c42faf0df08c.png)

#### FPS (Frame Per Second)
1초당 몇 이미지 Frame이 우리에게 보여지는지를 의미함

![image](https://user-images.githubusercontent.com/87646049/127490688-924543f3-65b6-45c5-9cc7-3c1c07b2432f.png)

#### mAP (Mean Average Precision)
AP의 평균

그렇다면 AP란?
- 물체 인식 분야의 알고리즘 성능을 평가하는 지표
> https://light-tree.tistory.com/124
> recall : 물체 검출율
> precision : 인식된(혹은 검출된) 객체에 대한 분류(classification)의 정확


