window.TOTAL_SCENES = 70; // 최종 완성 시 총 장면 수로 일괄 변경 가능
    /* ==============================================================
       [S2 브릿지 시작 장면] 장면 20 (서점 카운터 비둘기 맞이 씬)
       ============================================================== */
        /* ==============================================================
       [S2 1장면 / 첫 장면] 서재 안 도착 씬 (#1D123D 90% multiply 필터 + 레드 대화창)
       ============================================================== */
    window.SCENES = window.SCENES || {};
    window.SCENES[1] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/pigeon_desk_base.png" alt="">
          <div class="scene-21-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '자, 도착했습니다. 거기... 불 좀 켜주시겠습니까?',
          45,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (!typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    // 21번 장면으로도 상호 호환 매핑
    window.SCENES[21] = window.SCENES[1];

    /* ==============================================================
       [S2 2장면] 형광등 점등 씬 (형광등 깜빡이며 켜짐 + 투명도 0 필터 전환 + 그린 대화창)
       ============================================================== */
    window.SCENES[2] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/pigeon_desk_base.png" alt="">
          <div class="scene-flicker-filter"></div>
          <div class="lamp-flare"></div>
          <div class="dialog-wrap green">
            <img class="dialog-bg" src="02_motions/03 ,05, 07, 13, 36 Green text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        let flickerTimer = null;
        const startFlicker = () => {
          if (el.classList.contains('flicker-active')) return;
          el.classList.add('flicker-active');
          playSwitchSound();
        };

        // 그린 텍스트 규칙: You: (#308DA4) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        const typing = typeDialog(
          speakerEl,
          'You: ',
          bodyEl,
          '스위치가 이건가...?',
          50,
          350,
          {
            onChar: (typedCount) => {
              // 'You: ' (5자) + '스위치가' (4자) = 9글자 출력 시점에 즉시 점등 시작
              if (typedCount >= 9) {
                startFlicker();
              }
            },
            onComplete: (isImmediate) => {
              startFlicker();
            }
          }
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (!typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (flickerTimer) clearTimeout(flickerTimer);
            typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[22] = window.SCENES[2];

    /* ==============================================================
       [S2 3장면] 놀란 P (인간 발견)
       - 배경: 01_backgrounds/23.png (눈썹 올라간 P)
       - 대화창: 레드 대화창 (02_motions/06 Red text background .png)
       - 대사: "P: 이런, 밤눈이 어두워서 몰랐는데 인간이셨군요?"
       ============================================================== */
    window.SCENES[3] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/pigeon_desk_base.png" alt="">
          <img class="pigeon-eyebrows" src="02_motions/eyebrows_surprised.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '이런, 밤눈이 어두워서 몰랐는데 인간이셨군요?',
          45,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (!typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[23] = window.SCENES[3];

    /* ==============================================================
       [S2 4장면] 난감한 P (인간의 책이 없음)
       - 배경: 01_backgrounds/24.png (난감/미안한 표정의 P)
       - 대화창: 레드 대화창 (02_motions/06 Red text background .png)
       - 대사: "P: 죄송하지만 이곳에는 인간의 언어로 쓰인 책이..."
       ============================================================== */
    window.SCENES[4] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/pigeon_desk_base.png" alt="">
          <img class="pigeon-eyebrows" src="02_motions/eyebrows_sad.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '죄송하지만 이곳에는 인간의 언어로 쓰인 책이...',
          45,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (!typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[24] = window.SCENES[4];

    /* ==============================================================
       [S2 5장면] 당황한 P (아차차, 차차차차!!!!!!!!)
       - 배경: 01_backgrounds/25.png (볼 붉히고 당황한 P)
       - 대화창: 레드 대화창 (02_motions/06 Red text background .png)
       - 대사: "P: 아차차, 차차차차!!!!!!!!"
       ============================================================== */
    window.SCENES[5] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/25.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '아차차, 차차차차!!!!!!!!',
          45,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (!typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[25] = window.SCENES[5];

    /* ==============================================================
       [S2 6장면] 사다리를 든 P 이동 씬
       - 배경: 01_backgrounds/26.png (2732*2048 무손실 배경)
       - 이동 요소: 02_motions/26_ladder_pigeon.png (x930.49 y-171.36 -> x388.87 y-144.73)
       - 1차 대사: "P: 그게 있었지 참..."
       - 2차 대사: "P: 제 인간 친구가 선물해준 책이 몇 권 있답니다."
       - 2차 대사 시: 스탑 포인트 원본 시안(01_backgrounds/26_stop_point.png)으로 대체 & 이동 스프라이트 숨김
       ============================================================== */
    window.SCENES[6] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg bg-moving" src="01_backgrounds/26.png" alt="">
          <img class="bg bg-stop" src="01_backgrounds/26_stop_point.png" alt="" style="opacity: 0; pointer-events: none;">
          <div class="scene-clear-filter"></div>
          <div class="ladder-pigeon-carrier">
            <img class="ladder-pigeon-img" src="02_motions/26_ladder_pigeon.png" alt="">
          </div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const carrier = el.querySelector('.ladder-pigeon-carrier');
        const bgMoving = el.querySelector('.bg-moving');
        const bgStop = el.querySelector('.bg-stop');
        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        let currentPhase = 1;
        let typing = null;
        let moveTimer = null;

        // 1차 대사: "P: 그게 있었지 참..."
        typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '그게 있었지 참...',
          45,
          350
        );

        // 사다리를 들고 x930.49y-171.36 에서 x388.87y-144.73로 이동 시작
        requestAnimationFrame(() => {
          el.classList.add('ladder-moving');
        });

        // 2차 대사 시작 함수 (스탑 포인트 도착 시점)
        function startPhase2() {
          if (currentPhase === 2) return;
          currentPhase = 2;
          speakerEl.textContent = '';
          bodyEl.textContent = '';

          // 2차 대사 시작 시 스탑 포인트 원본 png로 대체 및 이동 요소 숨김
          if (bgStop) bgStop.style.opacity = '1';
          if (bgMoving) bgMoving.style.display = 'none';
          if (carrier) carrier.style.display = 'none';
          el.classList.remove('ladder-moving');

          typing = typeDialog(
            speakerEl,
            'P: ',
            bodyEl,
            '제 인간 친구가 선물해준 책이 몇 권 있답니다.',
            45,
            150
          );
        }

        // 2.6초 후 스탑 포인트 도착
        moveTimer = setTimeout(() => {
          startPhase2();
        }, 2600);

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (currentPhase === 1) {
            // 이동 중 클릭 시 즉시 스탑 포인트로 안착 & 2차 대사 시작
            clearTimeout(moveTimer);
            startPhase2();
          } else if (currentPhase === 2) {
            if (typing && !typing.isFinished()) {
              typing.finish();
            } else {
              app.next('fade');
            }
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            clearTimeout(moveTimer);
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[26] = window.SCENES[6];

    /* ==============================================================
       장면 7 (27번 장면: 사다리 옆 비둘기 + 레드 대화창)
       ============================================================== */
    window.SCENES[7] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/27.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '...이젠 아주 오래전의 이야기가 되었지만 말이죠.',
          45,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('none');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[27] = window.SCENES[7];

    /* ==============================================================
       장면 8 (28번 장면: 사다리 앞 P 말줄임표 대사 - 29번 배경 및 비둘기 뒷모습 위치 완벽 일치)
       ============================================================== */
    window.SCENES[8] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="bg-wrap">
            <img class="bg" src="01_backgrounds/28_clean.png" alt="">
            <div class="ladder-climber-pigeon">
              <img src="02_motions/29 Ladder ride pigeon.png" alt="">
            </div>
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '......',
          45,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('none');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[28] = window.SCENES[8];

    /* ==============================================================
       장면 9 (29번 장면: You 대사 + 비둘기 사다리 발받침 점프 안착)
       ============================================================== */
    window.SCENES[9] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="bg-wrap">
            <img class="bg" src="01_backgrounds/29_clean.png" alt="">
            <div class="ladder-climber-pigeon">
              <img src="02_motions/29 Ladder ride pigeon.png" alt="">
            </div>
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap green">
            <img class="dialog-bg" src="02_motions/03 ,05, 07, 13, 36 Green text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        let isJumping = false;

        const triggerJump = () => {
          if (isJumping) return;
          isJumping = true;
          el.classList.add('jumping');
          setTimeout(() => {
            el.classList.remove('jumping');
            el.classList.add('jumped');
          }, 640);
        };

        const finishJump = () => {
          isJumping = true;
          el.classList.remove('jumping');
          el.classList.add('jumped');
        };

        // 그린 텍스트 규칙: You: (#308DA4) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'You: ',
          bodyEl,
          '...그나저나 화분이 참 예쁘네요...!',
          50,
          300,
          {
            onChar: (typedCount) => {
              // 'You: ' (5자) + '...' (3자) = 8글자 시점(그나저나 입력 시점)에 위로 톡 점프
              if (typedCount >= 8) {
                triggerJump();
              }
            },
            onComplete: () => {
              finishJump();
            }
          }
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
            finishJump();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[29] = window.SCENES[9];

    /* ==============================================================
       장면 10 (30번 장면: P 대사 '아, ‘로즈마리’ 말씀이신가요?' + 책 주섬주섬 날개 모션)
       ============================================================== */
    window.SCENES[10] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="bg-wrap">
            <img class="bg" src="01_backgrounds/30.png" alt="">
            <div class="rosemary-pigeon-wrap">
              <div class="pigeon-wing wing-left">
                <img src="02_motions/30_pigeon_lwing.png" alt="">
              </div>
              <div class="pigeon-wing wing-right">
                <img src="02_motions/30_pigeon_rwing.png" alt="">
              </div>
              <div class="pigeon-body">
                <img src="02_motions/30_pigeon_body_clean.png" alt="">
              </div>
            </div>
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '아, ‘로즈마리’ 말씀이신가요?',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('none');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[30] = window.SCENES[10];

    /* ==============================================================
       장면 11 (31번 장면: P 대사 '...로즈마리, 참 애틋한 식물이죠.' + 책 안는 완성 모션)
       ============================================================== */
    window.SCENES[11] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="bg-wrap">
            <img class="bg" src="01_backgrounds/30.png" alt="">
            <div class="rosemary-pigeon-wrap packing">
              <div class="pigeon-wing wing-left">
                <img src="02_motions/30_pigeon_lwing.png" alt="">
              </div>
              <div class="pigeon-wing wing-right">
                <img src="02_motions/30_pigeon_rwing.png" alt="">
              </div>
              <div class="pigeon-body">
                <img src="02_motions/30_pigeon_body_clean.png" alt="">
              </div>
            </div>
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '...로즈마리, 참 애틋한 식물이죠.',
          55,
          350
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('none');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[31] = window.SCENES[11];

    /* ==============================================================
       장면 12 (32번 장면)
       ============================================================== */
    window.SCENES[12] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/32.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '꽃말이 무언지 아십니까?',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('none');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[32] = window.SCENES[12];

    /* ==============================================================
       장면 13 (33번 장면: You 대사 + 인간 갸우뚱 모션 + 빈티지 땀방울 꿈틀 모션)
       ============================================================== */
    window.SCENES[13] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="bg-wrap">
            <img class="bg" src="01_backgrounds/33.png" alt="">
            <div class="scene-33-sweat">
              <img src="02_motions/33_sweat.png" alt="">
            </div>
            <div class="scene-33-head">
              <img src="02_motions/33_head.png" alt="">
            </div>
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap green">
            <img class="dialog-bg" src="02_motions/03 ,05, 07, 13, 36 Green text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');
        let isTilted = false;

        const tiltTimer = setTimeout(() => {
          isTilted = true;
          el.classList.add('tilted');
        }, 1300);

        const finishTilt = () => {
          clearTimeout(tiltTimer);
          isTilted = true;
          el.classList.add('tilted');
        };

        // 그린 텍스트 규칙: You: (#308DA4) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'You: ',
          bodyEl,
          '그, 글쎄요오? (로즈마리도 꽃이 피는구나...)',
          50,
          300,
          {
            onComplete: () => {
              finishTilt();
            }
          }
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
            finishTilt();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            clearTimeout(tiltTimer);
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[33] = window.SCENES[13];

    /* ==============================================================
       장면 14 (34번 장면: Pigeon 대사)
       ============================================================== */
    window.SCENES[14] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/34.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '행복한 추억, 변치 않는 애정...',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('none');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[34] = window.SCENES[14];

    /* ==============================================================
       장면 15 (35번 장면: 34번에서 줌인 확대 연출 + Pigeon 대사)
       ============================================================== */
    window.SCENES[15] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="scene-35-zoom-wrap">
            <img class="bg bg-start" src="01_backgrounds/pan_35_36.png" alt="">
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        let isTypingDone = false;
        let isZoomStarted = false;
        let isZoomed = false;
        let zoomDelayTimer = null;
        let zoomTimer = null;
        let typing = null;

        const startZoom = () => {
          if (isZoomStarted) return;
          isZoomStarted = true;
          el.classList.add('zooming');
          zoomTimer = setTimeout(() => {
            finishZoom();
          }, 1500);
        };

        const finishZoom = () => {
          if (isZoomed) return;
          isZoomed = true;
          clearTimeout(zoomDelayTimer);
          clearTimeout(zoomTimer);
          el.classList.add('zoomed');
        };

        const onTypingComplete = (isImmediate) => {
          isTypingDone = true;
          if (isImmediate) {
            // 클릭으로 즉시 출력된 경우 지체 없이 바로 줌 시작
            startZoom();
          } else {
            // 대사 타이핑이 자연 종료된 경우 250ms 여운 후 카메라 줌 시작
            zoomDelayTimer = setTimeout(() => {
              startZoom();
            }, 250);
          }
        };

        // 대사를 먼저 다 입력한 후에 카메라 줌인 진행
        typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '그리고... 나를 기억해 주십시오.',
          45,
          200,
          { onComplete: onTypingComplete }
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          // 1. 대사 타이핑 중 클릭 시 전체 대사 즉시 출력 및 줌 시작
          if (typing && !typing.isFinished()) {
            typing.finish();
            return;
          }
          // 2. 줌 지연 대기 중 클릭 시 즉시 줌 시작
          if (!isZoomStarted) {
            clearTimeout(zoomDelayTimer);
            startZoom();
            return;
          }
          // 3. 줌 진행 중 클릭 시 줌 즉시 완료
          if (!isZoomed) {
            finishZoom();
            return;
          }
          // 4. 모든 연출 완료 후 클릭 시 끊김 없이 다음 장면(36번)으로 이동 (fade 대신 none)
          app.next('none');
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            clearTimeout(zoomDelayTimer);
            clearTimeout(zoomTimer);
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[35] = window.SCENES[15];

    /* ==============================================================
       장면 16 (36번 장면: 35번에서 카메라 이동 연출 + Pigeon 대사)
       ============================================================== */
    window.SCENES[16] = {
      mount(el, app) {
        el.innerHTML = `
          <div class="scene-36-pan-wrap">
            <img class="bg bg-pan" src="01_backgrounds/pan_35_36.png" alt="">
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        let isSettled = false;
        let moveTimer = null;
        let typing = null;

        // 카메라 풀화면 이동/확대 애니메이션 시작 (시작 프레임 100% 렌더링 후 끊김 없이 카메라 팬 이동)
        void el.offsetWidth;
        requestAnimationFrame(() => {
          el.classList.add('camera-moving');
        });

        const startTyping = () => {
          if (typing) return;
          typing = typeDialog(
            speakerEl,
            'P: ',
            bodyEl,
            '보고 싶은데 볼 수 없는 마음이 무엇인지 아십니까?',
            45,
            120
          );
        };

        const finishCamera = () => {
          if (isSettled) return;
          isSettled = true;
          clearTimeout(moveTimer);
          el.classList.add('camera-settled'); // 대화창 등장 (CSS opacity transition)
          startTyping();
        };

        // 2.2초 카메라 확대/팬 모션 완료 시점에 대화창 등장 및 대사 타이핑 시작
        moveTimer = setTimeout(() => {
          finishCamera();
        }, 2200);

        const onClick = (e) => {
          if (e.button !== 0) return;
          // 1. 모션 진행 중 클릭 시 카메라 이동 즉시 완료, 대화창 등장 및 대사 타이핑 시작
          if (!isSettled) {
            finishCamera();
            return;
          }
          // 2. 타이핑 중 클릭 시 전체 대사 즉시 출력
          if (typing && !typing.isFinished()) {
            typing.finish();
            return;
          }
          // 3. 타이핑 완료 후 클릭 시 다음 장면으로 이동
          if (typing && typing.isFinished()) {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            clearTimeout(moveTimer);
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };
    window.SCENES[36] = window.SCENES[16];

    /* ==============================================================
       장면 17 (37번 장면: H 대사 + 양손 위아래 모션 + 땀방울 꿈틀)
       ============================================================== */
    window.SCENES[17] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/37.png" alt="">
          <div class="scene-37-sweat">
            <img src="02_motions/37_sweat.png" alt="">
          </div>
          <div class="scene-37-arm-l">
            <img src="02_motions/37_l_arm.png" alt="">
          </div>
          <div class="scene-37-arm-r">
            <img src="02_motions/37_r_arm.png" alt="">
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap green">
            <img class="dialog-bg" src="02_motions/03 ,05, 07, 13, 36 Green text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 그린 텍스트 규칙: You: (#308DA4) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'You: ',
          bodyEl,
          '어......답답하고...아프고...(왜 이런 걸 묻지?)',
          50,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[37] = window.SCENES[17];

    /* ==============================================================
       장면 18 (38번 장면: 책을 든 비둘기 + P 대사)
       ============================================================== */
    window.SCENES[18] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/38.png" alt="">
          <div class="scene-38-pigeon">
            <img src="02_motions/38_pigeon.png" alt="">
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '큼, 맞지요.',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[38] = window.SCENES[18];

    /* ==============================================================
       장면 19 (39번 장면: 책을 든 비둘기 + P 대사: 쑥스럽지만 저는 인간의 글을 읽을 줄 모른답니다!)
       ============================================================== */
    window.SCENES[19] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/39.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '쑥스럽지만 저는 인간의 글을 읽을 줄 모른답니다!',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[39] = window.SCENES[19];

    /* ==============================================================
       장면 20 (40번 장면: 책을 든 비둘기 + P 대사: 그래서 한 권도 못 읽었습니다.)
       ============================================================== */
    window.SCENES[20] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/40.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '그래서 한 권도 못 읽었습니다.',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    window.SCENES[40] = window.SCENES[20];

    /* ==============================================================
       [S2 41장면 (구 40번)] 책을 든 비둘기 (P: "꼭 다 보겠다고 약속했는데...")
       ============================================================== */
    window.SCENES[41] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/41.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '꼭 다 보겠다고 약속했는데...',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    /* ==============================================================
       [S2 42장면 (구 41번)] 안도의 비둘기 웃는 눈 ("You: (에이, 뭐야. 그냥 책 이야기였잖아?)")
       ============================================================== */
    window.SCENES[42] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/42.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap green">
            <img class="dialog-bg" src="02_motions/03 ,05, 07, 13, 36 Green text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 그린 텍스트 규칙: You: (#308DA4) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'You: ',
          bodyEl,
          '(에이, 뭐야. 그냥 책 이야기였잖아?)',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    /* ==============================================================
       [S2 43장면] 클로즈업 비둘기 ("P: 그래서 대신 읽어줄 누군가를 기다리고 있었달까요?")
       ============================================================== */
    window.SCENES[43] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/43.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '그래서 대신 읽어줄 누군가를 기다리고 있었달까요?',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    /* ==============================================================
       [S2 44장면] 책 고르기 카운터 ("P: 저는 이만 자리를 비울 테니 취향껏 읽어보시죠.")
       ============================================================== */
    window.SCENES[44] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/44.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '저는 이만 자리를 비울 테니 취향껏 읽어보시죠.',
          45,
          300
        );

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    /* ==============================================================
       [S2 45장면] 카운터 뒤 비둘기 침강 퇴장 ("P: 그럼 편안한 시간 되십시오...")
       ============================================================== */
    window.SCENES[45] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/45.png" alt="">
          <div class="scene-43-well">
            <img class="scene-43-pigeon" src="02_motions/43_pigeon.png" alt="">
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap red">
            <img class="dialog-bg" src="02_motions/06 Red text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 레드 텍스트 규칙: P: (#D13D79) / 대사 (#FFFAE1, 48px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          'P: ',
          bodyEl,
          '그럼 편안한 시간 되십시오...',
          45,
          300
        );

        // 44번 모습 그대로에서 0.35초 후 천천히 책상 아래로 하강하여 완전히 가려짐
        const downTimer = setTimeout(() => {
          el.classList.add('pigeon-down');
        }, 350);

        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          } else {
            app.next('fade');
          }
        };
        el.addEventListener('click', onClick);

        return {
          unmount() {
            clearTimeout(downTimer);
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
          },
        };
      },
    };

    /* ==============================================================
       [S2 46장면] 책상 위 책 고르기 ("책을 골라 보세요. 건너뛰려면 화면을 두 번 클릭하세요.")
       ============================================================== */
    window.SCENES[46] = {
      mount(el, app) {
        el.innerHTML = `
          <img class="bg" src="01_backgrounds/46.png" alt="">
          <div class="books-container">
            <div class="book-item" data-index="1" title="우리는 사실 아무것도 모른다">
              <img class="book-cover" src="02_motions/44_book1.png" alt="우리는 사실 아무것도 모른다">
            </div>
            <div class="book-item" data-index="2" title="장미와 선인장의 사랑 이야기">
              <img class="book-cover" src="02_motions/44_book2.png" alt="장미와 선인장의 사랑 이야기">
            </div>
            <div class="book-item" data-index="3" title="검은 고양이가 되어버린 검은 새">
              <img class="book-cover" src="02_motions/44_book3.png" alt="검은 고양이가 되어버린 검은 새">
            </div>
            <div class="book-item" data-index="4" title="유령과의 소개팅">
              <img class="book-cover" src="02_motions/44_book4.png" alt="유령과의 소개팅">
            </div>
          </div>
          <div class="arm-cursor">
            <img src="02_motions/R arm(04, 43).png" alt="">
          </div>
          <div class="scene-clear-filter"></div>
          <div class="dialog-wrap purple">
            <img class="dialog-bg" src="02_motions/04 Purple text background .png" alt="">
            <div class="dialog-text">
              <span class="speaker"></span>
              <span class="dialog-body"></span>
            </div>
          </div>
        `;

        const speakerEl = el.querySelector('.speaker');
        const bodyEl = el.querySelector('.dialog-body');

        // 보라색 대화창 규칙: 대사 (#615CB7, 43px, DungGeunMo)
        const typing = typeDialog(
          speakerEl,
          '',
          bodyEl,
          '책을 골라 보세요. 건너뛰려면 화면을 두 번 클릭하세요.',
          40,
          300
        );

        // arm 마우스 커서 추적 (RAF 감쇠 보간)
        const stage = document.getElementById('stage');
        let stageRect = stage.getBoundingClientRect();
        const updateRect = () => { stageRect = stage.getBoundingClientRect(); };
        window.addEventListener('resize', updateRect);

        const armEl = el.querySelector('.arm-cursor');
        let targetX = 900, targetY = 550;
        let currentX = 900, currentY = 550;
        let armRaf = 0;

        const onMouseMove = (e) => {
          const scale = stageRect.width / 1366;
          const stageX = (e.clientX - stageRect.left) / scale;
          const stageY = (e.clientY - stageRect.top) / scale;

          targetX = Math.max(340, Math.min(1150, stageX));
          targetY = Math.max(180, Math.min(760, stageY));
        };

        const renderArm = () => {
          currentX += (targetX - currentX) * 0.18;
          currentY += (targetY - currentY) * 0.18;
          armEl.style.left = currentX + 'px';
          armEl.style.top = currentY + 'px';
          armRaf = requestAnimationFrame(renderArm);
        };
        armRaf = requestAnimationFrame(renderArm);
        window.addEventListener('mousemove', onMouseMove);

        let lastClickTime = 0;
        const onClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
            lastClickTime = Date.now();
            return;
          }
          const now = Date.now();
          if (now - lastClickTime < 600) {
            lastClickTime = 0;
            app.next('fade');
          } else {
            lastClickTime = now;
          }
        };

        const onDblClick = (e) => {
          if (e.button !== 0) return;
          if (typing && !typing.isFinished()) {
            typing.finish();
          }
          app.next('fade');
        };

        el.addEventListener('click', onClick);
        el.addEventListener('dblclick', onDblClick);

        // 책 클릭 시 책 읽기 뷰어(47장면)로 전환
        const onBookClick = (e) => {
          e.stopPropagation();
          const item = e.currentTarget;
          const bookIdx = parseInt(item.dataset.index, 10);
          if (app.openReader) {
            app.openReader(bookIdx);
          } else {
            window.CURRENT_BOOK_ID = bookIdx;
            app.goTo(47, 'fade');
          }
        };

        const bookItems = el.querySelectorAll('.book-item');
        bookItems.forEach((item) => {
          item.addEventListener('click', onBookClick);
        });

        return {
          unmount() {
            cancelAnimationFrame(armRaf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', updateRect);
            if (typing) typing.stop();
            el.removeEventListener('click', onClick);
            el.removeEventListener('dblclick', onDblClick);
            bookItems.forEach((item) => {
              item.removeEventListener('click', onBookClick);
            });
          },
        };
      },
    };

    /* ==============================================================
       [S2 47장면] 책 뷰어 (나무 질감 배경 + 앞/뒷표지 및 PDF 양쪽 펼침면 뷰어 + 드롭쉐도우 + 책척도 바)
       ============================================================== */
    window.SCENES[47] = {
      isReader: true,
      mount(el, app) {
        const bookIdx = window.CURRENT_BOOK_ID || 1;
        const BOOKS_DATA = {
          1: {
            title: '우리는 사실 아무것도 모른다',
            front: '02_motions/book1_front.png',
            back: '02_motions/book1_back.png',
            pageCount: 194,
            pagePrefix: '02_motions/book1_pages/p',
          },
          2: {
            title: '장미와 선인장의 사랑 이야기',
            front: '02_motions/book2_front.png',
            back: '02_motions/book2_back.png',
            pageCount: 72,
            pagePrefix: '02_motions/book2_pages/p',
          },
          3: {
            title: '검은 고양이가 되어버린 검은 새',
            front: '02_motions/book3_front.png',
            back: '02_motions/book3_back.png',
            pageCount: 96,
            pagePrefix: '02_motions/book3_pages/p',
          },
          4: {
            title: '유령과의 소개팅',
            front: '02_motions/book4_front.png',
            back: '02_motions/book4_back.png',
            pageCount: 82,
            pagePrefix: '02_motions/book4_pages/p',
          },
        };

        const currentBook = BOOKS_DATA[bookIdx] || BOOKS_DATA[1];
        const totalSpreads = currentBook.pageCount ? Math.ceil(currentBook.pageCount / 2) : 0;
        // 총 단계 수: 0 = 앞표지, 1..totalSpreads = 양쪽 펼침면, totalSpreads + 1 = 뒷표지
        const totalSteps = totalSpreads > 0 ? totalSpreads + 1 : 1;

        el.innerHTML = `
          <img class="bg" src="01_backgrounds/wood_texture.png" alt="">
          <div class="scene-clear-filter"></div>
          <div class="reader-stage">
            <div class="book-viewport">
              <div class="book-page book-page-left" style="display: none;">
                <img class="book-page-img" src="" alt="">
              </div>
              <div class="book-page book-page-right" style="display: flex;">
                <img class="book-page-img" src="${currentBook.front}" alt="${currentBook.title} 앞표지">
              </div>
              <div class="book-spine-crease"></div>
            </div>
            <div class="reader-zone zone-left" title="이전 (책방으로 나가기)"></div>
            <div class="reader-zone zone-right" title="다음 장"></div>
            <div class="reader-progress-wrap" title="척도바를 클릭하거나 드래그하여 페이지 이동">
              <div class="reader-progress-bar">
                <div class="reader-progress-fill"></div>
              </div>
            </div>
          </div>
        `;

        const pageLeftEl = el.querySelector('.book-page-left');
        const pageRightEl = el.querySelector('.book-page-right');
        const pageLeftImg = pageLeftEl.querySelector('.book-page-img');
        const pageRightImg = pageRightEl.querySelector('.book-page-img');
        const creaseEl = el.querySelector('.book-spine-crease');
        const zoneLeft = el.querySelector('.zone-left');
        const zoneRight = el.querySelector('.zone-right');
        const progressWrap = el.querySelector('.reader-progress-wrap');
        const progressBar = el.querySelector('.reader-progress-bar');
        const progressFill = el.querySelector('.reader-progress-fill');

        let currentPage = 0; // 0 = 앞표지

        // 이미지 프리로더 (부드러운 페이지 전환)
        const preloadSpread = (spreadIdx) => {
          if (spreadIdx < 1 || spreadIdx > totalSpreads) return;
          const pL = (spreadIdx - 1) * 2 + 1;
          const pR = (spreadIdx - 1) * 2 + 2;
          const imgA = new Image();
          imgA.src = `${currentBook.pagePrefix}${pL}.png`;
          const imgB = new Image();
          imgB.src = `${currentBook.pagePrefix}${pR}.png`;
        };

        const updateView = () => {
          if (currentPage === 0) {
            // [앞표지 상태]
            // 우측 화면에 앞표지 배치, 좌측 비움
            pageLeftEl.style.display = 'none';
            pageRightEl.style.display = 'flex';
            pageRightImg.src = currentBook.front;
            pageRightImg.alt = `${currentBook.title} 앞표지`;
            if (creaseEl) creaseEl.style.display = 'none';

            zoneRight.classList.remove('disabled');
            zoneRight.style.cursor = 'pointer';
            zoneLeft.title = '책방으로 나가기 (46p)';
            zoneRight.title = totalSpreads > 0 ? '책 열기 (첫 장으로)' : '다음 장 (뒷표지)';

            // 책척도 좌측 끝에 딱 맞게 정렬 (18px)
            progressFill.style.width = '18px';

            if (totalSpreads > 0) {
              preloadSpread(1);
              preloadSpread(2);
            }
          } else if (currentPage === totalSteps) {
            // [뒷표지 상태]
            // 좌측 화면에 뒷표지 배치, 우측 비움
            pageLeftEl.style.display = 'flex';
            pageLeftImg.src = currentBook.back;
            pageLeftImg.alt = `${currentBook.title} 뒷표지`;
            pageRightEl.style.display = 'none';
            if (creaseEl) creaseEl.style.display = 'none';

            // 뒷표지가 나오는 장면에서는 화면 오른쪽 클릭 반응 비활성화
            zoneRight.classList.add('disabled');
            zoneRight.style.cursor = 'default';
            zoneLeft.title = totalSpreads > 0 ? '이전 장으로' : '이전 장 (앞표지)';
            zoneRight.title = '';

            // 책척도 우측 끝까지 100% 채움
            progressFill.style.width = '100%';
          } else {
            // [양쪽 펼침면 상태] (1 <= currentPage <= totalSpreads)
            const leftNum = (currentPage - 1) * 2 + 1;
            const rightNum = (currentPage - 1) * 2 + 2;

            pageLeftEl.style.display = 'flex';
            pageRightEl.style.display = 'flex';
            pageLeftImg.src = `${currentBook.pagePrefix}${leftNum}.png`;
            pageLeftImg.alt = `${currentBook.title} ${leftNum}쪽`;
            pageRightImg.src = `${currentBook.pagePrefix}${rightNum}.png`;
            pageRightImg.alt = `${currentBook.title} ${rightNum}쪽`;
            if (creaseEl) creaseEl.style.display = 'block';

            zoneRight.classList.remove('disabled');
            zoneRight.style.cursor = 'pointer';

            if (currentPage === 1) {
              zoneLeft.title = '표지로 돌아가기';
            } else {
              const prevL = (currentPage - 2) * 2 + 1;
              const prevR = (currentPage - 2) * 2 + 2;
              zoneLeft.title = `이전 장 (${prevL}-${prevR}쪽)`;
            }

            if (currentPage === totalSpreads) {
              zoneRight.title = '뒷표지 보기';
            } else {
              const nextL = currentPage * 2 + 1;
              const nextR = currentPage * 2 + 2;
              zoneRight.title = `다음 장 (${nextL}-${nextR}쪽)`;
            }

            // 책척도 바 (860px 너비 기준 진행도 반영)
            const ratio = currentPage / totalSteps;
            const fillPx = Math.max(18, Math.round(18 + (860 - 18) * ratio));
            progressFill.style.width = fillPx + 'px';

            // 다음 페이지 미리 로드
            preloadSpread(currentPage + 1);
            preloadSpread(currentPage + 2);
          }
        };

        const onLeftClick = (e) => {
          if (e && e.button !== 0) return;
          if (currentPage === 0) {
            // 표지가 나타난 화면에서는 좌측 클릭하면 다시 46페이지로 복귀
            app.goTo(46, 'fade');
          } else {
            currentPage--;
            updateView();
          }
        };

        const onRightClick = (e) => {
          if (e && e.button !== 0) return;
          if (currentPage >= totalSteps) {
            // 뒷표지가 나오는 장면에서는 화면 오른쪽 클릭 반응 비활성화
            return;
          }
          currentPage++;
          updateView();
        };

        const onKeyDown = (e) => {
          if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            onRightClick();
          } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            onLeftClick();
          }
        };

        let isDraggingProgress = false;

        const seekByClientX = (clientX) => {
          if (!progressBar) return;
          const rect = progressBar.getBoundingClientRect();
          if (rect.width <= 0) return;
          const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
          const ratio = offsetX / rect.width;
          const targetStep = Math.round(ratio * totalSteps);
          const clampedStep = Math.max(0, Math.min(totalSteps, targetStep));
          if (clampedStep !== currentPage) {
            currentPage = clampedStep;
            updateView();
          }
        };

        const onProgressMouseDown = (e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          e.stopPropagation();
          isDraggingProgress = true;
          if (progressWrap) progressWrap.classList.add('dragging');
          seekByClientX(e.clientX);
          window.addEventListener('mousemove', onProgressMouseMove);
          window.addEventListener('mouseup', onProgressMouseUp);
          window.addEventListener('blur', onProgressMouseUp);
        };

        const onProgressMouseMove = (e) => {
          if (!isDraggingProgress) return;
          e.preventDefault();
          seekByClientX(e.clientX);
        };

        const onProgressMouseUp = (e) => {
          if (!isDraggingProgress) return;
          isDraggingProgress = false;
          if (progressWrap) progressWrap.classList.remove('dragging');
          window.removeEventListener('mousemove', onProgressMouseMove);
          window.removeEventListener('mouseup', onProgressMouseUp);
          window.removeEventListener('blur', onProgressMouseUp);
        };

        const onProgressTouchStart = (e) => {
          if (e.touches.length !== 1) return;
          isDraggingProgress = true;
          if (progressWrap) progressWrap.classList.add('dragging');
          seekByClientX(e.touches[0].clientX);
          window.addEventListener('touchmove', onProgressTouchMove, { passive: false });
          window.addEventListener('touchend', onProgressTouchEnd);
          window.addEventListener('touchcancel', onProgressTouchEnd);
        };

        const onProgressTouchMove = (e) => {
          if (!isDraggingProgress || e.touches.length !== 1) return;
          e.preventDefault();
          seekByClientX(e.touches[0].clientX);
        };

        const onProgressTouchEnd = (e) => {
          if (!isDraggingProgress) return;
          isDraggingProgress = false;
          if (progressWrap) progressWrap.classList.remove('dragging');
          window.removeEventListener('touchmove', onProgressTouchMove);
          window.removeEventListener('touchend', onProgressTouchEnd);
          window.removeEventListener('touchcancel', onProgressTouchEnd);
        };

        if (progressWrap) {
          progressWrap.addEventListener('mousedown', onProgressMouseDown);
          progressWrap.addEventListener('touchstart', onProgressTouchStart, { passive: true });
        }

        zoneLeft.addEventListener('click', onLeftClick);
        zoneRight.addEventListener('click', onRightClick);
        window.addEventListener('keydown', onKeyDown);

        updateView();

        return {
          unmount() {
            zoneLeft.removeEventListener('click', onLeftClick);
            zoneRight.removeEventListener('click', onRightClick);
            if (progressWrap) {
              progressWrap.removeEventListener('mousedown', onProgressMouseDown);
              progressWrap.removeEventListener('touchstart', onProgressTouchStart);
            }
            window.removeEventListener('mousemove', onProgressMouseMove);
            window.removeEventListener('mouseup', onProgressMouseUp);
            window.removeEventListener('blur', onProgressMouseUp);
            window.removeEventListener('touchmove', onProgressTouchMove);
            window.removeEventListener('touchend', onProgressTouchEnd);
            window.removeEventListener('touchcancel', onProgressTouchEnd);
            window.removeEventListener('keydown', onKeyDown);
          },
        };
      },
    };

/* ---------- 웹 오디오 형광등 점등 효과음 (스위치 딸깍 + 초크 스타터 지직- 스파크 + 점등 험) ---------- */
    function playSwitchSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const now = ctx.currentTime;

        // 1. 벽면 스위치 찰칵 (2회 연속 물리 스위치 타격음)
        function playSwitchClick(time, freq, dur, vol) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);
          osc.frequency.exponentialRampToValueAtTime(70, time + dur);
          gain.gain.setValueAtTime(vol || 0.35, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + dur);
        }
        playSwitchClick(now, 950, 0.016, 0.35);
        playSwitchClick(now + 0.022, 540, 0.025, 0.28);

        // 2. 형광등 초크 스타터 방전 스파크 (치직- 츠츠-)
        function playSparkNoise(time, dur, vol, filterFreq) {
          const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * dur));
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1);
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(filterFreq || 1800, time);
          filter.Q.setValueAtTime(2.0, time);

          const gain = ctx.createGain();
          gain.gain.setValueAtTime(vol, time);
          gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(time);
        }

        // 형광등 깜빡임 키프레임과 싱크된 방전 스파크 (18%, 40%, 68%~82%)
        playSparkNoise(now + 0.32, 0.035, 0.18, 1700); // 1차 깜빡
        playSparkNoise(now + 0.70, 0.040, 0.22, 1900); // 2차 깜빡
        playSparkNoise(now + 0.76, 0.030, 0.16, 1600);
        playSparkNoise(now + 1.22, 0.040, 0.26, 2100); // 4차 연속 스파크
        playSparkNoise(now + 1.30, 0.045, 0.30, 1800);
        playSparkNoise(now + 1.40, 0.038, 0.25, 2200);
        playSparkNoise(now + 1.47, 0.050, 0.32, 1600);

        // 3. 점등 완료 찰나(1.58s): 램프 점등 충격음 + 안정기 전압 험(웅-)
        playSwitchClick(now + 1.58, 420, 0.045, 0.25);

        const humOsc = ctx.createOscillator();
        const humGain = ctx.createGain();
        humOsc.type = 'sawtooth';
        humOsc.frequency.setValueAtTime(120, now + 1.58);

        const humFilter = ctx.createBiquadFilter();
        humFilter.type = 'lowpass';
        humFilter.frequency.setValueAtTime(280, now + 1.58);

        humGain.gain.setValueAtTime(0.001, now + 1.58);
        humGain.gain.linearRampToValueAtTime(0.12, now + 1.62);
        humGain.gain.exponentialRampToValueAtTime(0.001, now + 2.15);

        humOsc.connect(humFilter);
        humFilter.connect(humGain);
        humGain.connect(ctx.destination);
        humOsc.start(now + 1.58);
        humOsc.stop(now + 2.15);

      } catch (e) {
        console.warn('Switch sound error:', e);
      }
    }

    /* ---------- 웹 오디오 노크 효과음 합성 재생 (똑-똑) ---------- */
    function playKnockSound() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        function singleKnock(time, freq) {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, time);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.25, time + 0.09);

          oscGain.gain.setValueAtTime(0.85, time);
          oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);

          osc.connect(oscGain);
          oscGain.connect(ctx.destination);

          osc.start(time);
          osc.stop(time + 0.09);

          const bufferSize = Math.floor(ctx.sampleRate * 0.025);
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = 'lowpass';
          noiseFilter.frequency.setValueAtTime(900, time);

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.95, time);
          noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.025);

          noise.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(ctx.destination);

          noise.start(time);
          noise.stop(time + 0.025);
        }

        const now = ctx.currentTime;
        singleKnock(now + 0.16, 175);
        singleKnock(now + 0.38, 165);
      } catch (e) {
        console.warn('Knock sound error:', e);
      }
    }

    /* ---------- 타이핑 모션 (기본 텍스트 출력) ---------- */
    function typeText(el, lines, speed = 32, startDelay = 1700) {
      const chars = [];
      lines.forEach((line, li) => {
        if (li) el.appendChild(document.createElement('br'));
        for (const c of line) {
          const s = document.createElement('span');
          s.className = 'ch';
          s.textContent = c === ' ' ? '\u00A0' : c;
          el.appendChild(s);
          chars.push(s);
        }
      });

      let i = 0, timer = 0;
      const step = () => {
        if (i >= chars.length) return;
        chars[i++].classList.add('on');
        timer = setTimeout(step, speed);
      };
      timer = setTimeout(step, startDelay);

      return {
        finish() { clearTimeout(timer); chars.forEach((c) => c.classList.add('on')); i = chars.length; },
        stop() { clearTimeout(timer); },
      };
    }

    /* ---------- 대사 타이핑 모션 (화자 + 대사 순차 출력) ---------- */
    function typeDialog(speakerEl, speakerText, bodyEl, bodyText, speed = 45, startDelay = 400, options = {}) {
      const chars = [];
      const dimParen = options.dimParen !== false;
      const onComplete = options.onComplete;
      let completedFired = false;

      const fireComplete = (isImmediate = false) => {
        if (!completedFired) {
          completedFired = true;
          if (typeof onComplete === 'function') {
            onComplete(isImmediate);
          }
        }
      };

      // 화자 (You: / P:)
      for (const c of speakerText) {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c === ' ' ? '\u00A0' : c;
        speakerEl.appendChild(s);
        chars.push(s);
      }

      // 대사 내용
      let inParen = false;
      for (const c of bodyText) {
        if (dimParen && c === '(') inParen = true;
        const s = document.createElement('span');
        s.className = (dimParen && inParen) ? 'ch dim' : 'ch';
        s.textContent = c === ' ' ? '\u00A0' : c;
        bodyEl.appendChild(s);
        chars.push(s);
        if (dimParen && c === ')') inParen = false;
      }

      let i = 0, timer = 0;
      let finished = false;

      const step = () => {
        if (i >= chars.length) {
          finished = true;
          fireComplete(false);
          return;
        }
        chars[i++].classList.add('on');
        if (typeof options.onChar === 'function') {
          options.onChar(i, chars.length);
        }
        timer = setTimeout(step, speed);
      };
      timer = setTimeout(step, startDelay);

      return {
        isFinished: () => finished,
        finish() {
          clearTimeout(timer);
          chars.forEach((c) => c.classList.add('on'));
          i = chars.length;
          finished = true;
          fireComplete(true);
        },
        stop() {
          clearTimeout(timer);
        },
      };
    }

    /* ---------- 빗줄기 애니메이션 (12.5fps 스톱모션) ---------- */
    function startRain(canvas, options = {}) {
      const ctx = canvas.getContext('2d');
      const W = canvas.width, H = canvas.height;
      const img = new Image();
      img.src = '02_motions/02-07, 12-13 rain line .png';

      const BASE_W = 45, BASE_H = 59.5;
      const SPEED = 12;
      // 배경 요소의 상단 이동 오프셋 (2장면: 0, 3~6, 11장면: -85px)
      const noMask = options.noMask === true;
      const offsetY = options.offsetY ?? 0;
      const buildingLeft = 379;
      const buildingRight = 899;
      const signLeft = 898;
      const signRight = 1015;
      const buildingTop = 165 + offsetY;
      const buildingBottom = 840 + offsetY;
      const signTop = 205 + offsetY;
      const signBottom = 516 + offsetY;
      const bottomY = 825 + offsetY;

      const COUNT = 60;
      const TOTAL_SPAN = W + 700;
      const START_X = -100;
      const drops = [];
      const MIN_DX = 24;
      const MIN_DY = 130;

      for (let i = 0; i < COUNT; i++) {
        let bestX = 0, bestY = 0;
        let found = false;
        for (let attempt = 0; attempt < 80; attempt++) {
          const testX = START_X + Math.random() * TOTAL_SPAN;
          const testY = Math.random() * (H + BASE_H * 2) - BASE_H;
          const overlapped = drops.some((d) => {
            const dx = Math.abs(d.originX - testX);
            const dy = Math.abs(d.y - testY);
            return dx < MIN_DX && dy < MIN_DY;
          });
          if (!overlapped) {
            bestX = testX; bestY = testY; found = true; break;
          }
        }
        if (!found) { bestX = START_X + Math.random() * TOTAL_SPAN; bestY = Math.random() * H; }
        const rot = -(37.1 + (Math.random() * 4 - 2)) * Math.PI / 180;
        const driftRatio = Math.tan(Math.abs(rot));
        drops.push({
          x: bestX, y: bestY, originX: bestX,
          resetY: -(Math.random() * 150 + BASE_H),
          rot, driftRatio
        });
      }

      const FPS = 12.5, STEP = 1000 / FPS;
      let raf = 0, last = performance.now();
      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        if (now - last < STEP) return;
        const dt = Math.min((now - last) / 16.67, 12);
        last = now;
        ctx.clearRect(0, 0, W, H);
        if (img.complete && img.naturalWidth) {
          const moveY = SPEED * dt;
          for (const d of drops) {
            d.y += moveY;
            d.x += SPEED * d.driftRatio * dt;
            if (d.y > H + BASE_H) {
              d.y = d.resetY;
              d.x = d.originX + (d.y / SPEED) * (SPEED * d.driftRatio);
            }
            // [침범 방지 1차] 건물 본체, 간판, 바닥 영역에 닿으면 생략 (간판 아래 영역은 통과하여 비가 내림)
            if (!noMask) {
              const inMain = (d.x >= buildingLeft && d.x <= buildingRight && d.y >= buildingTop && d.y <= buildingBottom);
              const inSign = (d.x >= signLeft && d.x <= signRight && d.y >= signTop && d.y <= signBottom);
              const inBottom = (d.y >= bottomY);
              if (inMain || inSign || inBottom) continue;
            }
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate(d.rot);
            ctx.drawImage(img, -BASE_W / 2, -BASE_H / 2, BASE_W, BASE_H);
            ctx.restore();
          }
          if (!noMask) {
            // [침범 방지 2차] 건물 본체, 간판, 바닥 영역 마스킹 (간판 아래 영역은 마스킹하지 않아 비가 내림)
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillRect(buildingLeft, buildingTop, buildingRight - buildingLeft, buildingBottom - buildingTop);
            ctx.fillRect(signLeft, signTop, signRight - signLeft, signBottom - signTop);
            ctx.fillRect(0, bottomY, W, H - bottomY);
            ctx.restore();
          }
        }
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    /* ==============================================================
       장면 관리자 & 스케일러 (1366x1024 유지 + 2분 무입력 시 1장면 복귀)
       ============================================================== */
    (() => {
      const stage = document.getElementById('stage');
      const W = 1366, H = 1024;
      const IDLE_MS = 2 * 60 * 1000;

      // 비율 유지 스케일
      const fit = () => {
        stage.style.setProperty('--scale', Math.min(innerWidth / W, innerHeight / H));
      };
      addEventListener('resize', fit);
      fit();

      let current = null;

      function goTo(n, transition = 'none') {
        const def = window.SCENES[n];
        if (!def) { console.warn('장면 없음:', n); return; }

        const el = document.createElement('section');
        const numPad = String(n).padStart(2, '0');
        const altNumPad = (n >= 21 && n <= 40) ? String(n - 20).padStart(2, '0') : (n >= 1 && n <= 20 ? String(n + 20).padStart(2, '0') : '');
        el.className = `scene scene-${numPad} ${altNumPad ? `scene-${altNumPad}` : ''}`.trim();
        const prev = current;

        // 새 씬 마운트 및 조립(대화창 카운터, 필터)을 DOM 삽입 전에 완료하여 화면 깜빡임/번쩍임 완전 방지
        current = { n, el, scene: null };
        current.scene = def.mount(el, api) || {};

        // 대화창 맨 아래 줄 또는 대화창 없는 화면의 최상단 레이어에 '현재장면/70' 번호 표기 자동 부착
        // 단, 책 읽는 화면(47장면 등)은 화면 넘버링에서 완전 제외
        const isReader = (n === 47 || def.isReader === true || el.classList.contains('scene-47'));
        if (!isReader) {
          const sceneNum = (n >= 1 && n <= 20) ? (n + 20) : n;
          const dialogWraps = el.querySelectorAll('.dialog-wrap');
          if (dialogWraps.length > 0) {
            dialogWraps.forEach((dw) => {
              if (!dw.querySelector('.scene-counter')) {
                const counterEl = document.createElement('div');
                counterEl.className = 'scene-counter';
                counterEl.textContent = `${sceneNum}/70`;
                dw.appendChild(counterEl);
              }
            });
          } else {
            if (!el.querySelector('.scene-counter')) {
              const counterEl = document.createElement('div');
              counterEl.className = 'scene-counter';
              counterEl.textContent = `${sceneNum}/70`;
              el.appendChild(counterEl);
            }
          }
        }

        // S2 모든 장면에 공통 컬러 필터 레이어 (#E8CBFF, 50%, multiply) 최상위 배치
        const hasDialog = !!el.querySelector('.dialog-wrap');
        const filter = document.createElement('div');
        filter.className = `scene-color-filter ${hasDialog ? 'with-dialog' : 'full'}`;
        el.appendChild(filter);

        if (transition === 'slideUp' && prev) {
          stage.insertBefore(el, prev.el);
          prev.el.classList.add('slide-up-out');
          prev.el.addEventListener('animationend', () => destroy(prev), { once: true });
        } else if (transition === 'fade' && prev) {
          el.classList.add('fade-in');
          stage.appendChild(el);

          // 비둘기 눈썹: 페이드아웃 대신 즉시바뀜 연출
          const prevEb = prev.el.querySelector('.pigeon-eyebrows');
          if (prevEb) prevEb.style.display = 'none';

          const newEb = el.querySelector('.pigeon-eyebrows');
          let tempEb = null;
          if (newEb) {
            tempEb = newEb.cloneNode(true);
            tempEb.classList.add('instant-eyebrow-clone');
            stage.appendChild(tempEb);
          }

          let done = false;
          const finishFade = () => {
            if (done) return;
            done = true;
            el.classList.remove('fade-in');
            if (tempEb) tempEb.remove();
            destroy(prev);
          };
          el.addEventListener('animationend', finishFade, { once: true });
          setTimeout(finishFade, 900); // 0.8s 페이드 안전 타이머
        } else {
          stage.appendChild(el);
          if (prev) destroy(prev);
        }

        resetIdle();
      }

      function destroy(s) {
        if (s.scene && s.scene.unmount) s.scene.unmount();
        s.el.remove();
      }

      const api = {
        goTo,
        next: (transition) => {
          if (current && (current.n === 20 || current.n === 40)) return goTo(41, transition);
          return goTo(current.n + 1, transition);
        },
        prev: (transition) => {
          if (current && current.n === 41) return goTo(20, transition);
          return goTo(Math.max(1, current.n - 1), transition);
        },
        openReader: (bookIdx = 1) => {
          window.CURRENT_BOOK_ID = bookIdx;
          goTo(47, 'fade');
        },
        get current() { return current && current.n; },
      };
      window.App = api;

      // 마우스 우클릭 시 이전 장면으로 이동
      window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (current && current.n > 1) {
          api.prev('fade');
        }
      });

      // 2분 무입력 타이머
      let idleTimer = null;
      function resetIdle() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (current && current.n !== 1) goTo(1, 'fade');
        }, IDLE_MS);
      }
      ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel'].forEach((ev) =>
        addEventListener(ev, resetIdle, { passive: true })
      );

      const urlScene = parseInt(new URLSearchParams(location.search).get('scene'));
      goTo(urlScene || 1);
    })();