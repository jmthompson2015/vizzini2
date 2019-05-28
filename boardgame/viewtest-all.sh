#! /bin/bash

export BASE=/Volumes/StorageDrive/jmthompson/git/vizzini2/boardgame

cd checkers
./viewtest-suite.sh

cd ../chess
./viewtest-suite.sh

cd ../reversi
./viewtest-suite.sh

cd ../tictactoe
./viewtest-suite.sh

cd ../warchest
./viewtest-suite.sh

cd ..
./viewtest-suite.sh