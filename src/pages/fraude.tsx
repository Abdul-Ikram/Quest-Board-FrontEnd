import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"

export default function EthlyFiPage() {
    return (
        <>
        <Navbar />
        <div className="flex flex-col items-center px-4 md:px-8 lg:px-20 py-10 space-y-20  bg-gradient-to-b from-white to-[#f0f0ff]">
            {/* Hero Section */}
            <section className="text-center space-y-6 w-full">
                <h1 className="text-sm font-semibold text-purple-600">First Ever Accepted Blockchain 🔥</h1>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">The First ETH Pegged Stablecoin</h2>
                <p className="text-muted-foreground text-lg">
                    Leverage ETH's value and earn ETH yield at the same time
                </p>
                <Button className="mt-4">Launch App</Button>
                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-6 mt-8">
                    <Card className="w-40 text-center">
                        <CardContent className="pt-6 space-y-2">
                            <p className="text-lg font-bold">$342,089,108</p>
                            <p className="text-muted-foreground text-sm">Total Collateral</p>
                        </CardContent>
                    </Card>
                    <Card className="w-40 text-center">
                        <CardContent className="pt-6 space-y-2">
                            <p className="text-lg font-bold">342,089,108</p>
                            <p className="text-muted-foreground text-sm">Total Supply</p>
                        </CardContent>
                    </Card>
                    <Card className="w-40 text-center">
                        <CardContent className="pt-6 space-y-2">
                            <p className="text-lg font-bold">18%</p>
                            <p className="text-muted-foreground text-sm">Yield APR</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* What is Ethly.Fi */}
            <section className="w-full text-center space-y-4">
                <h2 className="text-3xl font-bold">What is Ethly.Fi?</h2>
                <p className="text-muted-foreground text-lg">
                    Ethly.Fi is a decentralized protocol that allows users to mint a stablecoin
                    pegged to the value of ETH while earning yield at the same time.
                </p>
            </section>

            {/* Primary Features */}
            <section className="w-full space-y-6">
                <h2 className="text-2xl font-bold text-center">Primary Features</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="text-center">
                        <CardContent className="pt-6 space-y-2">
                            <h3 className="text-lg font-semibold">ETH-Pegged Stablecoin</h3>
                            <p className="text-muted-foreground text-sm">
                                Stable value backed by real ETH collateral.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="pt-6 space-y-2">
                            <h3 className="text-lg font-semibold">Low Risk</h3>
                            <p className="text-muted-foreground text-sm">
                                Fully decentralized and transparently audited system.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="pt-6 space-y-2">
                            <h3 className="text-lg font-semibold">Eth Yield</h3>
                            <p className="text-muted-foreground text-sm">
                                Earn ETH-based yield while holding your assets.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* How to Leverage Yield */}
            <section className="w-full  text-center space-y-6">
                <h2 className="text-2xl font-bold">How to Leverage Yield?</h2>
                <div className="grid gap-6 md:grid-cols-4">
                    {["Deposit collateral", "Mint eETH", "Redeem eETH for rewards", "Repeat all steps"].map((step, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="pt-6 space-y-2">
                                <h3 className="text-lg font-semibold">{step}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Strategic Collaborations */}
            <section className="w-full space-y-6 text-center">
                <h2 className="text-2xl font-bold">Strategic Collaborations</h2>
                <p className="text-muted-foreground">
                    Partnered with trusted projects and companies in blockchain ecosystem.
                </p>
                {/* Placeholder Logos */}
                <div className="flex flex-wrap justify-center gap-8">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className="h-10 w-24 bg-gray-100 rounded-md" />
                    ))}
                </div>
            </section>

            {/* Your Safety Priority */}
            <section className="w-full text-center space-y-6">
                <h2 className="text-2xl font-bold text-blue-600">Your Safety, Our Priority</h2>
                {/* Placeholder Auditors */}
                <div className="flex flex-wrap justify-center gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-8 w-20 bg-gray-100 rounded-md" />
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Ask Us Anything</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is the Ethly Protocol?</AccordionTrigger>
                        <AccordionContent>
                            Ethly is a decentralized stablecoin protocol enabling users to mint and earn yield from ETH-pegged assets.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How does it work?</AccordionTrigger>
                        <AccordionContent>
                            Users deposit ETH, mint stablecoins, and automatically earn ETH-based rewards.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Where to redeem eETH?</AccordionTrigger>
                        <AccordionContent>
                            You can redeem eETH on decentralized exchanges and within the EthlyFi app anytime.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
        <Footer />
        </>
    )
}