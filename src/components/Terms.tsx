import * as React from "react";
import { Grid, Row, Col, Panel } from "react-bootstrap";

interface TermsProps {}

interface TermsState {}

export class Terms extends React.Component<TermsProps, TermsState> {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} lg={12}>
                        <Panel>
                            <h3>Terms of Service</h3>
                            <p>
                                The following terms and conditions govern all
                                use of the samp-objects.com website and all
                                content, services and products available at or
                                through the website, including, but not limited
                                to, samp-objects.com Software, samp-objects.com
                                Comments and the samp-objects.com Hosting
                                service (“Hosting”), (taken together, the
                                Website). The Website is owned and operated by
                                Barnaby Keene (“Southclaws”). The Website is
                                offered subject to your acceptance without
                                modification of all of the terms and conditions
                                contained herein and all other operating rules,
                                policies (including, without limitation, the
                                Privacy Policy) and procedures that may be
                                published from time to time on this Site by
                                Southclaws (collectively, the “Agreement”).
                            </p>
                            <p>
                                Please read this Agreement carefully before
                                accessing or using the Website. By accessing or
                                using any part of the web site, you agree to
                                become bound by the terms and conditions of this
                                agreement. If you do not agree to all the terms
                                and conditions of this agreement, then you may
                                not access the Website or use any services. If
                                these terms and conditions are considered an
                                offer by Southclaws, acceptance is expressly
                                limited to these terms. The Website is available
                                only to individuals who are at least 13 years
                                old.
                            </p>
                            <h4>Your Account</h4>
                            <p>
                                If you create an account on the Website, you are
                                responsible for maintaining the security of your
                                account and you are fully responsible for all
                                activities that occur under the account. You
                                must immediately notify Southclaws of any
                                unauthorized uses of your account or any other
                                breaches of security. Southclaws will not be
                                liable for any acts or omissions by you,
                                including any damages of any kind incurred as a
                                result of such acts or omissions.
                            </p>
                            <h4>Content</h4>
                            <p>
                                If you make material available by means of the
                                Website (any such material, “Content”), You are
                                entirely responsible for the content of, and any
                                harm resulting from, that Content. That is the
                                case regardless of whether the Content in
                                question constitutes text, graphics, an audio
                                file, or computer software. By making Content
                                available, you represent and warrant that:
                            </p>
                            <ul>
                                <li>
                                    the downloading, copying and use of the
                                    Content will not infringe the proprietary
                                    rights, including but not limited to the
                                    copyright, patent, trademark or trade secret
                                    rights, of any third party;
                                </li>
                                <li>
                                    if your employer has rights to intellectual
                                    property you create, you have either (i)
                                    received permission from your employer to
                                    post or make available the Content,
                                    including but not limited to any software,
                                    or (ii) secured from your employer a waiver
                                    as to all rights in or to the Content;
                                </li>
                                <li>
                                    you have fully complied with any third-party
                                    licenses relating to the Content, and have
                                    done all things necessary to successfully
                                    pass through to end users any required
                                    terms;
                                </li>
                                <li>
                                    the Content does not contain or install any
                                    viruses, worms, malware, Trojan horses or
                                    other harmful or destructive content;
                                </li>
                                <li>
                                    the Content is not spam, is not machine- or
                                    randomly-generated, and does not contain
                                    unethical or unwanted commercial content
                                    designed to drive traffic to third party
                                    sites or boost the search engine rankings of
                                    third party sites, or to further unlawful
                                    acts (such as phishing) or mislead
                                    recipients as to the source of the material
                                    (such as spoofing);
                                </li>
                                <li>
                                    the Content is not pornographic, does not
                                    contain threats or incite violence, and does
                                    not violate the privacy or publicity rights
                                    of any third party;
                                </li>
                                <li>
                                    your content is not getting advertised via
                                    unwanted electronic messages such as spam
                                    links on newsgroups, email lists, blogs and
                                    web sites, and similar unsolicited
                                    promotional methods;
                                </li>
                                <li>
                                    your content is not named in a manner that
                                    misleads your readers into thinking that you
                                    are another person or company; and
                                </li>
                                <li>
                                    you have, in the case of Content that
                                    includes computer code, accurately
                                    categorized and/or described the type,
                                    nature, uses and effects of the materials,
                                    whether requested to do so by Southclaws or
                                    otherwise.
                                </li>
                                <li>
                                    you conform to the SA:MP license agreement
                                    given that the content uploaded here is
                                    intended (but not limited to) use with the
                                    SA:MP server and client software. You
                                    therefore are responsible for providing
                                    content that will not put a SA:MP server
                                    operator in a position of violating the
                                    SA:MP server agreement.
                                </li>
                            </ul>
                            <h4>User Content License</h4>
                            <p>
                                User contributions are licensed under a{" "}
                                <a
                                    href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US"
                                    target="_blank"
                                >
                                    Creative Commons
                                    Attribution-NonCommercial-ShareAlike 3.0
                                    Unported License
                                </a>. Without limiting any of those
                                representations or warranties, Southclaws has
                                the right (though not the obligation) to, in
                                Southclaws’s sole discretion (i) refuse or
                                remove any content that, in Southclaws’s
                                reasonable opinion, violates any Southclaws
                                policy or is in any way harmful or
                                objectionable, or (ii) terminate or deny access
                                to and use of the Website to any individual or
                                entity for any reason, in Southclaws’s sole
                                discretion. Southclaws will have no obligation
                                to provide a refund of any amounts previously
                                paid.
                            </p>
                            <h4>Paid Services</h4>
                            <p>
                                Optional paid services or upgrades may be
                                available on the Website. When utilizing an
                                optional paid service or upgrade, you agree to
                                pay Southclaws the monthly or annual
                                subscription fees indicated. Payments will be
                                charged on a pre-pay basis on the day you begin
                                utilizing the service or upgrade and will cover
                                the use of that service or upgrade for a monthly
                                or annual subscription period as indicated.
                                These fees are not refundable.
                            </p>
                            <p>
                                Unless you notify Southclaws before the end of
                                the applicable subscription period that you want
                                to cancel a service or upgrade, your
                                subscription will automatically renew and you
                                authorize us to collect the then-applicable
                                annual or monthly subscription fee (as well as
                                any taxes) using any credit card or other
                                payment mechanism we have on record for you.
                                Subscriptions can be canceled at any time.
                            </p>
                            <h4>Visitor Reponsibilities</h4>
                            <p>
                                Southclaws has not reviewed, and cannot review,
                                all of the material, including computer
                                software, posted to the Website, and cannot
                                therefore be responsible for that material’s
                                content, use or effects. By operating the
                                Website, Southclaws does not represent or imply
                                that it endorses the material there posted, or
                                that it believes such material to be accurate,
                                useful or non-harmful. You are responsible for
                                taking precautions as necessary to protect
                                yourself and your computer systems from viruses,
                                worms, Trojan horses, and other harmful or
                                destructive content. The Website may contain
                                content that is offensive, indecent, or
                                otherwise objectionable, as well as content
                                containing technical inaccuracies, typographical
                                mistakes, and other errors. The Website may also
                                contain material that violates the privacy or
                                publicity rights, or infringes the intellectual
                                property and other proprietary rights, of third
                                parties, or the downloading, copying or use of
                                which is subject to additional terms and
                                conditions, stated or unstated. Southclaws
                                disclaims any responsibility for any harm
                                resulting from the use by visitors of the
                                Website, or from any downloading by those
                                visitors of content there posted.
                            </p>
                            <h4>Copyright and DMCA</h4>
                            <p>
                                As Southclaws asks others to respect its
                                intellectual property rights, it respects the
                                intellectual property rights of others. If you
                                believe that material located on or linked to by
                                samp-objects.com violates your copyright, and if
                                this website resides in the USA, you are
                                encouraged to notify Southclaws in accordance
                                with Southclaws’s Digital Millennium Copyright
                                Act (“DMCA”) Policy. Southclaws will respond to
                                all such notices, including as required or
                                appropriate by removing the infringing material
                                or disabling all links to the infringing
                                material. Southclaws will terminate a visitor’s
                                access to and use of the Website if, under
                                appropriate circumstances, the visitor is
                                determined to be a repeat infringer of the
                                copyrights or other intellectual property rights
                                of Southclaws or others. In the case of such
                                termination, Southclaws will have no obligation
                                to provide a refund of any amounts previously
                                paid to Southclaws.
                            </p>
                            <h4>Intellectual Property Rights</h4>
                            <p>
                                This Agreement does not transfer from Southclaws
                                to you any Southclaws or third party
                                intellectual property, and all right, title and
                                interest in and to such property will remain (as
                                between the parties) solely with Southclaws.
                                Southclaws, samp-objects.com, the
                                samp-objects.com logo, southcla.ws, the
                                southcla.ws logo, and all other trademarks,
                                service marks, graphics and logos used in
                                connection with samp-objects.com, or the Website
                                are trademarks or registered trademarks of
                                Southclaws or Southclaws’ licensors. Other
                                trademarks, service marks, graphics and logos
                                used in connection with the Website may be the
                                trademarks of other third parties. Your use of
                                the Website grants you no right or license to
                                reproduce or otherwise use any Southclaws or
                                third-party trademarks.
                            </p>
                            <h4>Advertisements</h4>
                            <p>
                                Southclaws reserves the right to display
                                advertisements on your content unless you have
                                purchased an Ad-free Upgrade or a Services
                                account.
                            </p>
                            <h4>Changes to this Document</h4>
                            <p>
                                Southclaws reserves the right, at its sole
                                discretion, to modify or replace any part of
                                this Agreement. It is your responsibility to
                                check this Agreement periodically for changes.
                                Your continued use of or access to the Website
                                following the posting of any changes to this
                                Agreement constitutes acceptance of those
                                changes. Southclaws may also, in the future,
                                offer new services and/or features through the
                                Website (including, the release of new tools and
                                resources). Such new features and/or services
                                shall be subject to the terms and conditions of
                                this Agreement.
                            </p>
                            <h4>Termination</h4>
                            <p>
                                Southclaws may terminate your access to all or
                                any part of the Website at any time, with or
                                without cause, with or without notice, effective
                                immediately. If you wish to terminate this
                                Agreement or your samp-objects.com account (if
                                you have one), you may simply discontinue using
                                the Website. All provisions of this Agreement
                                which by their nature should survive termination
                                shall survive termination, including, without
                                limitation, ownership provisions, warranty
                                disclaimers, indemnity and limitations of
                                liability.
                            </p>
                            <h4>Warranties Disclaimer</h4>
                            <p>
                                The Website is provided “as is”. Southclaws and
                                its suppliers and licensors hereby disclaim all
                                warranties of any kind, express or implied,
                                including, without limitation, the warranties of
                                merchantability, fitness for a particular
                                purpose and non-infringement. Neither Southclaws
                                nor its suppliers and licensors, makes any
                                warranty that the Website will be error free or
                                that access thereto will be continuous or
                                uninterrupted. If you’re actually reading this,
                                here’s a treat. You understand that you download
                                from, or otherwise obtain content or services
                                through, the Website at your own discretion and
                                risk.
                            </p>
                            <h4>Limitation of Liability</h4>
                            <p>
                                In no event will Southclaws, or its suppliers or
                                licensors, be liable with respect to any subject
                                matter of this agreement under any contract,
                                negligence, strict liability or other legal or
                                equitable theory for: (i) any special,
                                incidental or consequential damages; (ii) the
                                cost of procurement for substitute products or
                                services; (iii) for interruption of use or loss
                                or corruption of data; or (iv) for any amounts
                                that exceed the fees paid by you to Southclaws
                                under this agreement during the twelve (12)
                                month period prior to the cause of action.
                                Southclaws shall have no liability for any
                                failure or delay due to matters beyond their
                                reasonable control. The foregoing shall not
                                apply to the extent prohibited by applicable
                                law.
                            </p>
                            <h4>Indemnification</h4>
                            <p>
                                You agree to indemnify and hold harmless
                                Southclaws, its contractors, and its licensors,
                                and their respective directors, officers,
                                employees and agents from and against any and
                                all claims and expenses, including attorneys’
                                fees, arising out of your use of the Website,
                                including but not limited to your violation of
                                this Agreement.
                            </p>
                            <h4>Footnotes</h4>
                            <p>
                                This Agreement constitutes the entire agreement
                                between Southclaws and you concerning the
                                subject matter hereof, and they may only be
                                modified by a written amendment signed by an
                                authorized executive of Southclaws, or by the
                                posting by Southclaws of a revised version.
                                Except to the extent applicable law, if any,
                                provides otherwise, this Agreement, any access
                                to or use of the Website will be governed by the
                                laws of the state of California, U.S.A.,
                                excluding its conflict of law provisions, and
                                the proper venue for any disputes arising out of
                                or relating to any of the same will be the state
                                and federal courts located in San Francisco
                                County, California. Except for claims for
                                injunctive or equitable relief or claims
                                regarding intellectual property rights (which
                                may be brought in any competent court without
                                the posting of a bond), any dispute arising
                                under this Agreement shall be finally settled in
                                accordance with the Comprehensive Arbitration
                                Rules of the Judicial Arbitration and Mediation
                                Service, Inc. (“JAMS”) by three arbitrators
                                appointed in accordance with such Rules. The
                                arbitration shall take place in San Francisco,
                                California, in the English language and the
                                arbitral decision may be enforced in any court.
                                The prevailing party in any action or proceeding
                                to enforce this Agreement shall be entitled to
                                costs and attorneys’ fees. If any part of this
                                Agreement is held invalid or unenforceable, that
                                part will be construed to reflect the parties’
                                original intent, and the remaining portions will
                                remain in full force and effect. A waiver by
                                either party of any term or condition of this
                                Agreement or any breach thereof, in any one
                                instance, will not waive such term or condition
                                or any subsequent breach thereof. You may assign
                                your rights under this Agreement to any party
                                that consents to, and agrees to be bound by, its
                                terms and conditions; Southclaws may assign its
                                rights under this Agreement without condition.
                                This Agreement will be binding upon and will
                                inure to the benefit of the parties, their
                                successors and permitted assigns.
                            </p>
                            <hr />
                            <p>
                                This document is CC-BY-SA. It was last updated
                                November 12, 2017.
                            </p>
                            <p>
                                Adapted from the Discourse forum software Terms
                                of Service and Originally adapted from the
                                WordPress Terms of Service.
                            </p>
                        </Panel>
                        <hr />
                        <Panel>
                            <h3>Privacy Policy</h3>
                            <p>
                                We collect information from you when you
                                register on our site and gather data when you
                                participate in the forum by reading, writing,
                                and evaluating the content shared here.
                            </p>
                            <p>
                                When registering on our site, you may be asked
                                to enter your name and e-mail address. You may,
                                however, visit our site without registering.
                                Your e-mail address will be verified by an email
                                containing a unique link. If that link is
                                visited, we know that you control the e-mail
                                address.
                            </p>
                            <p>
                                When registered and posting, we record the IP
                                address that the post originated from. We also
                                may retain server logs which include the IP
                                address of every request to our server.
                            </p>
                            <p>
                                We do not sell, trade, or otherwise transfer to
                                outside parties your personally identifiable
                                information. This does not include trusted third
                                parties who assist us in operating our site,
                                conducting our business, or servicing you, so
                                long as those parties agree to keep this
                                information confidential. We may also release
                                your information when we believe release is
                                appropriate to comply with the law, enforce our
                                site policies, or protect ours or others rights,
                                property, or safety. However, non-personally
                                identifiable visitor information may be provided
                                to other parties for marketing, advertising, or
                                other uses.
                            </p>
                            <p>
                                Occasionally, at our discretion, we may include
                                or offer third party products or services on our
                                site. These third party sites have separate and
                                independent privacy policies. We therefore have
                                no responsibility or liability for the content
                                and activities of these linked sites.
                                Nonetheless, we seek to protect the integrity of
                                our site and welcome any feedback about these
                                sites.
                            </p>
                            <p>
                                Our site, products and services are all directed
                                to people who are at least 13 years old or
                                older. If this server is in the USA, and you are
                                under the age of 13, per the requirements of
                                COPPA (<a
                                    href="https://en.wikipedia.org/wiki/Children%27s_Online_Privacy_Protection_Act"
                                    target="_blank"
                                >
                                    Children’s Online Privacy Protection Act
                                </a>), do not use this site.
                            </p>
                            <p>
                                By using our site, you consent to our web site
                                privacy policy. If we decide to change our
                                privacy policy, we will post those changes on
                                this page.
                            </p>
                            <hr />
                            <p>
                                This document is CC-BY-SA. It was last updated
                                November 12, 2017.
                            </p>
                            <p>
                                Adapted from the Discourse forum software
                                Privacy Policy.
                            </p>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
