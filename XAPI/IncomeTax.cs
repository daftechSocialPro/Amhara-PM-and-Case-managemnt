namespace XAPI
{
    public static class IncomeTax
    {
        public static double GetIncomeTax(float sal)
        {
            double tax = 0.0f;
            if (sal <= 600)
            {
                tax = 0;
            }
            else if (sal > 600 && sal <= 1650)
            {
                tax = sal * 0.1 - 60;
            }
            else if (sal > 1650 && sal <= 3200)
            {
                tax = sal * 0.15 - 142.50;
            }
            else if (sal > 3200 && sal <= 5250)
            {
                tax = sal * 0.2 - 302.50;
            }
            else if (sal > 5250 && sal <= 7800)
            {
                tax = sal * 0.25 - 565;
            }
            else if (sal > 7800 && sal <= 10900)
            {
                tax = sal * 0.30 - 955;
            }
            else
            {
                tax = sal * 0.35 - 1500;

            }
            return tax;
        }

        public static double GetIncomeTax_old(float sal)
        {
            double tax = 0.0f;
            if (sal <= 150)
            {
                tax = 0;

            }
            else if (sal >= 151 && sal <= 650.99)
            {

                tax = sal * 0.1 - 15;

            }
            else if (sal >= 651 && sal <= 1400.99)
            {

                tax = sal * 0.15 - 47.50;
            }
            else if (sal >= 1401 && sal <= 2350.99)
            {

                tax = sal * 0.2 - 117.50;
            }
            else if (sal >= 2351 && sal <= 3550.99)
            {

                tax = sal * 0.25 - 235;
            }
            else if (sal >= 3551 && sal <= 5000.99)
            {

                tax = sal * 0.30 - 412.50;
            }
            else
            {

                tax = sal * 0.35 - 662.50;
            }
            return tax;
        }
    }
}
