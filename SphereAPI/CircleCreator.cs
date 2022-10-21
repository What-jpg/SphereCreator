using System;
using static System.Console;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

using ClassRepo;
namespace CancellationTestApi
{
    class CircleCreator
    {
        public static /*async*/ /**Task<*/string/*>*/ Test(/*CancellationToken cancellationToken*/)
        {
            //await Task.Delay(5000); 
            //cancellationToken.ThrowIfCancellationRequested();
            return "string";
        }
        static void TwoDimDisplayer(CoordinatesContainer array2)
        {
            bool[,] array = AddYX(array2.MaxDiameter, array2.MaxDiameter);
            foreach (var e in array2.Coordinates)
            {
                if (e.Z == 1)
                {
                    array[e.Y, e.X] = true;
                }
            }
            for (int i = 1; i <= (array.GetLength(1) * 3); i++)
            {
                Write("_");
            }
            WriteLine("");
            for (int i = 0; i < array.GetLength(0); i++)
            {
                //bool[] ela = array[i];
                Write("| ");
                for (int i2 = 0; i2 < array.GetLength(1); i2++)
                {
                    if (array[i, i2] == true)
                    {
                        /*if (((i > 0) & (i < (array.Length -1))) & (i2 < (ela.Length - 2)))
                        {
                            Write(" o"); 
                            continue;
                        }
                        if (i == 0 | i == (array.Length -1))
                        {
                            Write("o "); 
                            continue;
                        }*/
                        Write("o ");
                        continue;
                    }
                    Write("  ");
                }
                Write("|");
                WriteLine("");
            }
            for (int i = 1; i <= (array.GetLength(1) * 3); i++)
            {
                Write("=");
            }
            WriteLine("");
        }

        static bool[,] AddYX(int Y, int X)
        {
            bool[,] arr = new bool[Y, X];
            for (int i = 0; i < arr.GetLength(0); i++)
            {
                for (int j = 0; j < arr.GetLength(1); j++)
                {
                    arr[i, j] = false;
                }
            }
            return arr;
        }

        static double ToRadians(double angle)
        {
            return (Math.PI / 180) * angle;
        }

        static BlocksCount CheckCircle(double X, double Y, double radius, int elGen, int XDiameter, int YDiameter)
        {
            //double radiusD = diameter / 2;
            //double radius = (double)diameter / 2;
            WriteLine("checking circle");

            /*int X = number;
            int Y = number;*/

            //int diameter = /*(int)radius*/(int)(radius * 2.0 + 1.0);

            int elGenerated = elGen;

            bool[,] array = AddYX(YDiameter, XDiameter);
            //int elGenerated = 1440;

            for (decimal i = 0; i < 360/*((Math.PI * 2) * radius)*/; i += 360.0M / (decimal)(elGenerated * 4))
            {
                double angle = ToRadians(Decimal.ToDouble(i));

                double xCoord = X + Math.Sin(angle) * radius;
                double yCoord = Y + Math.Cos(angle) * radius;

                int xCoordInt = /*(int)xCoord;*/Convert.ToInt32(xCoord)/*(int)Math.Round(value: xCoord, digits: 0, mode: MidpointRounding.AwayFromZero )*/;
                int yCoordInt = /*(int)yCoord;*/Convert.ToInt32(yCoord)/*(int)Math.Round(value: yCoord, digits: 0, mode: MidpointRounding.AwayFromZero )*/;
                //WriteLine($"{xCoordInt}, {yCoordInt}");

                array[yCoordInt, xCoordInt] = true;
            }
            int length = 0;
            foreach (bool e in array)
            {
                if (e == true)
                {
                    //WriteLine("Plus");
                    length++;
                }
            }
            WriteLine(length);
            if (length >= elGenerated)
            {
                BlocksCount BlocksEl = CheckCircle(X, Y, radius, elGenerated * 2, XDiameter, YDiameter);

                elGenerated = BlocksEl.divideCount;
                length = BlocksEl.blocks;
            }
            //elGenerated *= 4;
            //WriteLine(length);
            //WriteLine(elGenerated * 4);
            //return length;
            return new BlocksCount { blocks = length, divideCount = elGenerated };

        }

        static double CheckDiameter(double X, double Y, double radius, double YToCheck)
        {
            double firstAngle = Math.Acos((YToCheck - Y) / radius);
            //double secondAngle = 360.0 - firstAngle;
            double FirstX = X + Math.Sin(firstAngle) * radius;
            double SecondX = X + (-1 * Math.Sin(firstAngle)) * radius;
            double diameter;

            if (FirstX > SecondX)
            {
                diameter = FirstX - SecondX;
            }
            else
            {
                diameter = SecondX - FirstX;
            }
            return diameter;
        }
        static void CreateCircle(List<Coordinates> array, double X, double Y, double rRadius, int XDiameter, int YDiameter, int Z, bool isEven, int end, int checkNum, double multNum, CancellationToken cancellationToken)
        {
            //double radius = (double)diameter / 2;
            double radius = rRadius;
            /*if (YDiameter % 2 == 0)
            {
                if (radius >= 1.411 && radius <= 1.5)
                {
                    radius = 1.41;
                }
            }
            if (YDiameter % 2 != 0)
            {
                if (radius >= 0.7051 && radius <= 1.0)
                {
                    radius = 0.705;
                }
            }*/
            bool[,] arr = AddYX(YDiameter, XDiameter);
            decimal el = 360.0M / (decimal)(checkNum * multNum /*YDiameter * Math.PI * 4*/);
            //WriteLine(checkNum);
            //List<Coordinates> buggyArr = new List<Coordinates> { };
            //WriteLine(CheckCircle(X, Y, radius, 360, XDiameter, YDiameter).blocks);
            for (decimal i = 0; i < /*CheckCircle(radius)*/360; i += el)
            {
                try
                {
                    cancellationToken.ThrowIfCancellationRequested();

                    double angle = ToRadians(Decimal.ToDouble(i));

                    double xCoord = X + Math.Sin(angle) * radius;
                    double yCoord = Y + Math.Cos(angle) * radius;

                    //WriteLine($"X: {xCoord}, Y: {yCoord}, angle: {i}.");

                    int xCoordInt = Convert.ToInt32(xCoord)/*(int)Math.Round(value: xCoord, digits: 0, mode: MidpointRounding.AwayFromZero )*/;
                    int yCoordInt = Convert.ToInt32(yCoord)/*(int)Math.Round(value: yCoord, digits: 0, mode: MidpointRounding.AwayFromZero )*/;
                    //if(/*(xCoord <= 13.51 && xCoord >= 12.49) && (yCoord <= 27.51 && yCoord >= 26.49)*/i == 45)
                    /*{
                        WriteLine($"X: {xCoord}, Y: {yCoord}, angle: {i}.");
                        WriteLine($"In int X: {xCoordInt}, Y: {yCoordInt}, angle: {i}.");
                        WriteLine($"In Sin: {Math.Sin(angle)}, In Cos: {Math.Cos(angle)}.");
                    }*/
                    //WriteLine($"In int X: {xCoordInt}, Y: {yCoordInt}, angle: {i}.");
                    /*if (!buggyArr.Contains(new Coordinates { Y = yCoordInt, X = xCoordInt, Z = Z }))
                    {
                        buggyArr.Add(new Coordinates
                         {
                                Y = yCoordInt,
                                X = xCoordInt,
                                Z = Z
                        });
                        buggyArr.Add(new Coordinates
                         {
                                Y = 0,
                                X = 0,
                                Z = 0
                        });
                    } */
                    //WriteLine(buggyArr.Contains(new Coordinates { Y = 0, X = 0, Z = 0 }));
                    int mior = XDiameter - 1;

                    int yCoordIntRev = mior - yCoordInt;
                    int xCoordIntRev = mior - xCoordInt;

                    arr[yCoordInt, xCoordInt] = true;
                    arr[xCoordInt, yCoordInt] = true;
                    arr[yCoordIntRev, xCoordIntRev] = true;
                    arr[xCoordIntRev, yCoordIntRev] = true;
                    arr[yCoordInt, xCoordIntRev] = true;
                    arr[xCoordIntRev, yCoordInt] = true;
                    arr[yCoordIntRev, xCoordInt] = true;
                    arr[xCoordInt, yCoordIntRev] = true;
                }
                catch (Exception canceledException)
                {
                    //WriteLine(canceledException);
                    throw;
                }

            }
            /*buggyArr.Add(new Coordinates
                     {
                            Y = 0,
                            X = 0,
                            Z = 0
                    });
            WriteLine(buggyArr.Contains(new Coordinates { Y = 0, X = 0, Z = 0 }));
            WriteLine(buggyArr.Count());*/
            int length = 0;
            foreach (var e in arr)
            {
                if (e == true)
                {
                    length++;
                }

            }

            if (length >= checkNum/*true == false*/)
            {
                CreateCircle(array, X, Y, rRadius, XDiameter, YDiameter, Z, isEven, end, checkNum * 2, multNum, cancellationToken);
            }
            else
            {
                for (int iy = 0; iy < arr.GetLength(0); iy++)
                {
                    for (int ix = 0; ix < arr.GetLength(1); ix++)
                    {
                        if (arr[iy, ix])
                        {
                            if (!array.Contains(new Coordinates { Y = iy, X = ix, Z = Z }))
                            {
                                array.Add(new Coordinates
                                {
                                    Y = iy,
                                    X = ix,
                                    Z = Z
                                });
                            }
                            if (!array.Contains(new Coordinates { Y = iy, X = Z, Z = ix }))
                            {
                                array.Add(new Coordinates
                                {
                                    Y = iy,
                                    X = Z,
                                    Z = ix
                                });
                            }
                            if (!array.Contains(new Coordinates { Y = Z, X = ix, Z = iy }))
                            {
                                array.Add(new Coordinates
                                {
                                    Y = Z,
                                    X = ix,
                                    Z = iy
                                });
                            }

                            int secondCircle;
                            if (Z == end)
                            {
                                if (isEven)
                                {
                                    secondCircle = (XDiameter - 1) - Z;

                                    if (!array.Contains(new Coordinates { Y = iy, X = ix, Z = secondCircle }))
                                    {
                                        array.Add(new Coordinates
                                        {
                                            Y = iy,
                                            X = ix,
                                            Z = secondCircle
                                        });
                                    }
                                    if (!array.Contains(new Coordinates { Y = iy, X = secondCircle, Z = ix }))
                                    {
                                        array.Add(new Coordinates
                                        {
                                            Y = iy,
                                            X = secondCircle,
                                            Z = ix
                                        });
                                    }
                                    if (!array.Contains(new Coordinates { Y = secondCircle, X = ix, Z = iy }))
                                    {
                                        array.Add(new Coordinates
                                        {
                                            Y = secondCircle,
                                            X = ix,
                                            Z = iy
                                        });
                                    }
                                }
                            }
                            else
                            {
                                secondCircle = (YDiameter - 1) - Z;

                                if (!array.Contains(new Coordinates { Y = iy, X = ix, Z = secondCircle }))
                                {
                                    array.Add(new Coordinates
                                    {
                                        Y = iy,
                                        X = ix,
                                        Z = secondCircle
                                    });
                                }
                                if (!array.Contains(new Coordinates { Y = iy, X = secondCircle, Z = ix }))
                                {
                                    array.Add(new Coordinates
                                    {
                                        Y = iy,
                                        X = secondCircle,
                                        Z = ix
                                    });
                                }
                                if (!array.Contains(new Coordinates { Y = secondCircle, X = ix, Z = iy }))
                                {
                                    array.Add(new Coordinates
                                    {
                                        Y = secondCircle,
                                        X = ix,
                                        Z = iy
                                    });
                                }
                            }
                        }
                    }
                }
            }
            //buggyArr = new List<Coordinates>();
        }

        static void drawCircle(bool[,] arr, int xc, int yc, int x, int y)
        {
            arr[yc + y, xc + x] = true;
            arr[yc + y, xc - x] = true;
            arr[yc - y, xc + x] = true;
            arr[yc - y, xc - x] = true;
            arr[yc + x, xc + y] = true;
            arr[yc + x, xc - y] = true;
            arr[yc - x, xc + y] = true;
            arr[yc - x, xc - y] = true;
        }

        static void circleBres(bool[,] arr, int xc, int yc, int r)
        {
            int x = 0, y = r;
            int d = 3 - 2 * r;
            drawCircle(arr, xc, yc, x, y);
            while (y >= x)
            {
                // for each pixel we will
                // draw all eight pixels

                x++;

                // check for decision parameter
                // and correspondingly
                // update d, x, y
                if (d > 0)
                {
                    y--;
                    d = d + 4 * (x - y) + 10;
                }
                else
                    d = d + 4 * x + 6;
                drawCircle(arr, xc, yc, x, y);
            }
        }

        public static int BiggestX(List<Coordinates> arr, int y)
        {
            List<Coordinates> onY = new List<Coordinates>();
            foreach (var item in arr)
            {
                if (item.Y == y)
                {
                    onY.Add(item);
                }
            }
            int biggestNum = 0;
            foreach (var item in onY)
            {
                if (item.X > biggestNum)
                {
                    biggestNum = item.X;
                }
            }
            return biggestNum;
        }

        public static int SmallestX(List<Coordinates> arr, int y)
        {
            List<Coordinates> onY = new List<Coordinates>();
            foreach (var item in arr)
            {
                if (item.Y == y)
                {
                    onY.Add(item);
                }
            }
            int smallestNum = 0;
            foreach (var item in onY)
            {
                if (item.X < smallestNum)
                {
                    smallestNum = item.X;
                }
            }
            return smallestNum;
        }

        public static List<CoordinatesDouble> Minusing(List<Coordinates> lis, double minus)
        {
            List<CoordinatesDouble> Coordinatess = new List<CoordinatesDouble> { };
            foreach (var item in lis)
            {
                Coordinatess.Add(new CoordinatesDouble { X = (double)item.X - minus, Y = (double)item.Y - minus, Z = (double)item.Z - minus });
            }
            return Coordinatess;
        }

        public static List<CoordinatesDouble> DeleteCopies(List<CoordinatesDouble> arr) 
        {
            WriteLine("Deleting Copies...");
            List<CoordinatesDouble> arr2 = new List<CoordinatesDouble>();
            foreach (var item in arr)
	        {
                var itemSave = item;
                arr2.RemoveAll(c => c.X == itemSave.X && c.Y == itemSave.Y && c.Z == itemSave.Z);
                arr2.Add(itemSave);
              
	        }
            return arr2;
        }

        public static ReturnCoordinatesContainer CreateCircleWithYXZ(int maxDiameter, double generationQuality/*, double radius/*, int center*/, CancellationToken cancellationToken)
        {
            decimal fakeDiameter = (decimal)maxDiameter;
            decimal diameter = fakeDiameter;

            if (maxDiameter % 2 == 0)
            {
                if (diameter % 2 != 0)
                {
                    if (diameter % 1 == 0)
                    {
                        diameter += 0.001M;
                    }
                }
            }
            if (maxDiameter % 2 != 0)
            {
                if (diameter % 2 == 0)
                {
                    diameter += 0.001M;
                }
            }

            //int diameter = (radius * 2) + 1;
            double centerAndRadius = Convert.ToDouble((maxDiameter - 1.0M) / 2.0M)/*0*/;
            double center = Convert.ToDouble((diameter - 1.0M) / 2.0M)/*0*/;
            double cameraPos = 0.0;
            double minus = centerAndRadius;
            if (centerAndRadius % 1 != 0)
            {
                cameraPos = 0.5;
            }

            //CoordinatesContainer arr = new CoordinatesContainer { Coordinates = new List<Coordinates> {}, MinusInt = minus, MaxRadius = centerAndRadius, MaxDiameter = maxDiameter, CameraPosition = cameraPos};
            CoordinatesContainer realArr = new CoordinatesContainer { Coordinates = new List<Coordinates> { }, MinusInt = minus, MaxRadius = centerAndRadius, MaxDiameter = maxDiameter, CameraPosition = cameraPos };
            //double maxCenter = Convert.ToDouble((maxDiameter - 1.0M) / 2.0M)/*0*/;

            /*if(diameter % 2 == 0)
            {
                center = (double)(diameter / 2) - 0.5;
            } else
            {
                center = (double)(diameter / 2);
            }*/


            //bool[,] arr = AddYX(maxDiameter, maxDiameter/*diameter, diameter*/);
            //CreateCircle(arr.Coordinates, centerAndRadius, centerAndRadius, center, maxDiameter, maxDiameter, 0/*center, center, diameter*/);
            //CreateCircle(realArr.Coordinates, centerAndRadius, centerAndRadius, center, maxDiameter, maxDiameter, 4/*center, center, diameter*/);
            if (maxDiameter == 1)
            {
                realArr.Coordinates.Add(new Coordinates { X = 0, Y = 0, Z = 0 });
            }
            else if (maxDiameter == 2)
            {
                realArr.Coordinates.AddRange(new List<Coordinates> { new Coordinates { X = 0, Y = 0, Z = 0 }, new Coordinates { X = 1, Y = 0, Z = 0 }, new Coordinates { X = 0, Y = 1, Z = 0 }, new Coordinates { X = 0, Y = 0, Z = 1 }, new Coordinates { X = 0, Y = 1, Z = 1 }, new Coordinates { X = 1, Y = 1, Z = 0 }, new Coordinates { X = 1, Y = 0, Z = 1 }, new Coordinates { X = 1, Y = 1, Z = 1 } });
            }
            else
            {
                bool isEven = false;
                int divideNumber;
                if (maxDiameter % 2 == 0)
                {
                    isEven = true;
                    divideNumber = maxDiameter / 2;
                }
                else
                {
                    divideNumber = maxDiameter / 2 + 1;
                }
                //List<Coordinates> loArr = new List<Coordinates>();
                for (int i = 1; i < divideNumber; i++)
                {
                    double secondDiameter = CheckDiameter(centerAndRadius, centerAndRadius, center, i);
                    /*if (i == 4)
                    {
                        WriteLine($"Diameter: {CheckDiameter(centerAndRadius, centerAndRadius, center, i)}.");
                    }*/
                    WriteLine(i);

                    double secondRadius = secondDiameter / 2.0/*0*/;
                    //int secondCircle;

                    CreateCircle(realArr.Coordinates, centerAndRadius, centerAndRadius, secondRadius, maxDiameter, maxDiameter, i, isEven, divideNumber - 1, 360, generationQuality, cancellationToken);
                    /*if (i == divideNumber - 1)
                    {
                        if (isEven)
                        {
                            secondCircle = (maxDiameter - 1) - i;
                            CreateCircle(realArr.Coordinates, centerAndRadius, centerAndRadius, secondRadius, maxDiameter, maxDiameter, secondCircle);
                        }
                    } else
                    {
                        secondCircle = (maxDiameter - 1) - i;
                        CreateCircle(realArr.Coordinates, centerAndRadius, centerAndRadius, secondRadius, maxDiameter, maxDiameter, secondCircle);
                    }*/
                    /*if (i == 0)
                    {
                        double generatedDiameterMinusOne;
                        generatedDiameterMinusOne = BiggestX(arr.Coordinates, i) - SmallestX(arr.Coordinates, i);
                        CreateCircle(realArr.Coordinates, centerAndRadius, centerAndRadius, generatedDiameterMinusOne / 2, maxDiameter, maxDiameter, i);
                    }*/
                }
            }
            if (maxDiameter == 4)
            {
                //WriteLine("Four");
                /*realArr.Coordinates.Remove(new Coordinates { X = 1, Y = 1, Z = 1 });
                realArr.Coordinates.Remove(new Coordinates { X = 2, Y = 1, Z = 1 });
                realArr.Coordinates.Remove(new Coordinates { X = 1, Y = 2, Z = 1 });
                realArr.Coordinates.Remove(new Coordinates { X = 1, Y = 1, Z = 2 });
                realArr.Coordinates.Remove(new Coordinates { X = 1, Y = 2, Z = 2 });
                realArr.Coordinates.Remove(new Coordinates { X = 2, Y = 2, Z = 1 });
                realArr.Coordinates.Remove(new Coordinates { X = 2, Y = 1, Z = 2 });
                realArr.Coordinates.Remove(new Coordinates { X = 2, Y = 2, Z = 2 });*/
                realArr.Coordinates.RemoveAll(c => c.X > 0 && c.Y > 0 && c.Z > 0 && c.X < 3 && c.Y < 3 && c.Z < 3);
                //WriteLine($"Is it real - {realArr.Coordinates.Exists(c => c.X == 2 && c.Y == 2 && c.Z == 2)}");
            }
            //realArr.Coordinates = Minusing(realArr.Coordinates, realArr.MinusInt);
            var CoordinatesDouble = DeleteCopies(Minusing(realArr.Coordinates, realArr.MinusInt));
            ReturnCoordinatesContainer returnRealArr = new ReturnCoordinatesContainer { Coordinates = CoordinatesDouble, CameraPosition = CoordinatesDouble.Count() };
            return returnRealArr;
        }
    }
}